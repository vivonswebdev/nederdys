ALTER TABLE public.children
  ADD COLUMN IF NOT EXISTS gender text NOT NULL DEFAULT 'other';
ALTER TABLE public.children DROP CONSTRAINT IF EXISTS children_gender_check;
ALTER TABLE public.children
  ADD CONSTRAINT children_gender_check CHECK (gender IN ('girl','boy','other'));

ALTER TABLE public.avatar_items
  ADD COLUMN IF NOT EXISTS gender text NOT NULL DEFAULT 'other';
ALTER TABLE public.avatar_items DROP CONSTRAINT IF EXISTS avatar_items_gender_check;
ALTER TABLE public.avatar_items
  ADD CONSTRAINT avatar_items_gender_check CHECK (gender IN ('girl','boy','other'));

-- Nouveaux articles de boutique
INSERT INTO public.avatar_items (name, name_nl, category, dicebear_option, dicebear_value, price, rarity, is_premium, gender)
VALUES
  ('Rose bonbon','Snoeproze','background','backgroundColor','ffc0e9',30,'common',false,'girl'),
  ('Lavande','Lavendel','background','backgroundColor','e0bbe4',60,'rare',false,'girl'),
  ('Fuchsia','Fuchsia','background','backgroundColor','ff69b4',90,'epic',false,'girl'),
  ('Bleu roi','Koningsblauw','background','backgroundColor','4169e1',30,'common',false,'boy'),
  ('Vert émeraude','Smaragdgroen','background','backgroundColor','50c878',60,'rare',false,'boy'),
  ('Bleu glacier','IJsblauw','background','backgroundColor','b0e0e6',30,'common',false,'boy'),
  ('Violet magique','Magisch paars','background','backgroundColor','9b59b6',60,'rare',false,'other'),
  ('Menthe','Munt','background','backgroundColor','a0e7c5',30,'common',false,'other'),
  ('Soleil','Zon','background','backgroundColor','ffd93d',60,'rare',false,'other'),
  ('Blond platine','Platinablond','hair','hairColor','f6d7b0',60,'rare',false,'girl'),
  ('Rose flamant','Flamingoroze','hair','hairColor','ff69b4',120,'epic',false,'girl'),
  ('Roux flamboyant','Vlammend rood','hair','hairColor','cb6820',90,'epic',false,'girl'),
  ('Brun foncé','Donkerbruin','hair','hairColor','2b1b0e',30,'common',false,'boy'),
  ('Blond surfeur','Surferblond','hair','hairColor','e5d7a3',60,'rare',false,'boy'),
  ('Roux viking','Vikingrood','hair','hairColor','b22222',120,'epic',false,'boy'),
  ('Noir de jais','Gitzwart','hair','hairColor','0e0e0e',30,'common',false,'other'),
  ('Blanc polaire','Poolwit','hair','hairColor','ffffff',90,'epic',false,'other'),
  ('Bleu galaxie','Galaxyblauw','hair','hairColor','3498db',150,'legendary',false,'other'),
  ('Longs cheveux','Lang haar','hairstyle','hair','long02',60,'rare',false,'girl'),
  ('Tresses','Vlechten','hairstyle','hair','long07',90,'epic',false,'girl'),
  ('Chignon','Knot','hairstyle','hair','long12',90,'epic',false,'girl'),
  ('Boucles longues','Lange krullen','hairstyle','hair','long16',120,'epic',false,'girl'),
  ('Coupe courte','Kort kapsel','hairstyle','hair','short02',30,'common',false,'boy'),
  ('Coupe sport','Sportkapsel','hairstyle','hair','short05',60,'rare',false,'boy'),
  ('Mèche rebelle','Rebelse lok','hairstyle','hair','short09',90,'epic',false,'boy'),
  ('Crête','Hanenkam','hairstyle','hair','short16',120,'epic',false,'boy'),
  ('Cheveux mi-longs','Halflang haar','hairstyle','hair','long20',60,'rare',false,'other'),
  ('Boucles courtes','Korte krullen','hairstyle','hair','short18',60,'rare',false,'other'),
  ('Lunettes rondes','Ronde bril','accessory','accessories','variant01',60,'rare',false,'other'),
  ('Lunettes carrées','Vierkante bril','accessory','accessories','variant02',60,'rare',false,'boy'),
  ('Lunettes papillon','Vlinderbril','accessory','accessories','variant03',90,'epic',false,'girl'),
  ('Lunettes star','Sterbril','accessory','accessories','variant04',150,'legendary',false,'other'),
  ('Teint clair','Lichte huid','clothing','skinColor','f2d3b1',0,'common',false,'other'),
  ('Teint doré','Gouden huid','clothing','skinColor','ecad80',0,'common',false,'other'),
  ('Teint caramel','Karamel huid','clothing','skinColor','9e5622',0,'common',false,'other'),
  ('Teint ébène','Ebbenhouten huid','clothing','skinColor','763900',0,'common',false,'other')
ON CONFLICT DO NOTHING;

-- Classement mondial (aucune donnée personnelle en dehors du prénom)
CREATE OR REPLACE FUNCTION public.get_leaderboard(p_metric text DEFAULT 'xp', p_limit integer DEFAULT 100)
RETURNS TABLE(
  rank bigint,
  child_id uuid,
  display_name text,
  avatar_emoji text,
  gender text,
  total_xp integer,
  games_played integer,
  badges_earned integer,
  streak_days integer,
  is_mine boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH base AS (
    SELECT
      c.id,
      c.first_name,
      c.avatar_emoji,
      c.gender,
      c.user_id,
      COALESCE(l.xp, 0) AS total_xp,
      COALESCE(l.games_played, 0) AS games_played,
      COALESCE((SELECT COUNT(*) FROM public.achievements a WHERE a.child_id = c.id), 0)::int AS badges_earned,
      COALESCE((SELECT COUNT(*) FROM public.daily_streaks d WHERE d.child_id = c.id), 0)::int AS streak_days
    FROM public.children c
    LEFT JOIN public.child_levels l ON l.child_id = c.id
  )
  SELECT
    ROW_NUMBER() OVER (
      ORDER BY CASE lower(COALESCE(p_metric,'xp'))
        WHEN 'games' THEN b.games_played
        WHEN 'badges' THEN b.badges_earned
        WHEN 'streak' THEN b.streak_days
        ELSE b.total_xp
      END DESC, b.first_name ASC
    ) AS rank,
    b.id,
    b.first_name,
    b.avatar_emoji,
    b.gender,
    b.total_xp,
    b.games_played,
    b.badges_earned,
    b.streak_days,
    (b.user_id = auth.uid()) AS is_mine
  FROM base b
  ORDER BY CASE lower(COALESCE(p_metric,'xp'))
    WHEN 'games' THEN b.games_played
    WHEN 'badges' THEN b.badges_earned
    WHEN 'streak' THEN b.streak_days
    ELSE b.total_xp
  END DESC, b.first_name ASC
  LIMIT GREATEST(1, LEAST(COALESCE(p_limit, 100), 100));
$$;

REVOKE ALL ON FUNCTION public.get_leaderboard(text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(text, integer) TO authenticated;