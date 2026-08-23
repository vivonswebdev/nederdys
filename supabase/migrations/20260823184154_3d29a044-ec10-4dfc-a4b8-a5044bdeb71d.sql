ALTER TABLE public.avatar_config ADD COLUMN IF NOT EXISTS hair_style text;

ALTER TABLE public.avatar_items DROP CONSTRAINT IF EXISTS avatar_items_category_check;
ALTER TABLE public.avatar_items ADD CONSTRAINT avatar_items_category_check
  CHECK (category IN ('background','hair','clothing','accessory','hairstyle'));

INSERT INTO public.avatar_items (name, name_nl, category, dicebear_option, dicebear_value, price, rarity, is_premium) VALUES
('Longs cheveux lisses', 'Lang steil haar', 'hairstyle', 'hair', 'long01', 60, 'common', false),
('Couettes joyeuses', 'Vrolijke staartjes', 'hairstyle', 'hair', 'long07', 80, 'common', false),
('Boucles douces', 'Zachte krullen', 'hairstyle', 'hair', 'long12', 100, 'rare', false),
('Tresse de princesse', 'Prinsessenvlecht', 'hairstyle', 'hair', 'long16', 120, 'rare', false),
('Chignon élégant', 'Elegante knot', 'hairstyle', 'hair', 'long20', 150, 'epic', false),
('Vagues de sirène', 'Zeemeerminhaar', 'hairstyle', 'hair', 'long26', 200, 'legendary', false),
('Blond doré', 'Goudblond', 'hair', 'hairColor', 'e5d7a3', 40, 'common', false),
('Rose bonbon', 'Snoeproze', 'hair', 'hairColor', 'ecc7d4', 90, 'rare', false),
('Roux flamboyant', 'Vurig rood', 'hair', 'hairColor', 'cb6820', 70, 'common', false),
('Violet magique', 'Magisch paars', 'hair', 'hairColor', 'ac6ee6', 130, 'epic', false),
('Lunettes papillon', 'Vlinderbril', 'accessory', 'accessories', 'glasses02', 70, 'common', false),
('Lunettes étoiles', 'Sterrenbril', 'accessory', 'accessories', 'glasses05', 110, 'rare', false),
('Fond rose pastel', 'Pastelroze achtergrond', 'background', 'backgroundColor', 'ffd5e5', 30, 'common', false),
('Fond lilas', 'Lila achtergrond', 'background', 'backgroundColor', 'd7c4f5', 30, 'common', false);