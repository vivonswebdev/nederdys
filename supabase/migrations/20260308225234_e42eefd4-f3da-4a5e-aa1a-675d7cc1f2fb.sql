
-- Table to track Mouche-Coins balance per child
CREATE TABLE public.child_coins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  coins integer NOT NULL DEFAULT 0,
  total_earned integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(child_id)
);

ALTER TABLE public.child_coins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own child coins" ON public.child_coins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own child coins" ON public.child_coins FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own child coins" ON public.child_coins FOR UPDATE USING (auth.uid() = user_id);

-- Table to track purchased items
CREATE TABLE public.purchased_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  item_id text NOT NULL,
  equipped boolean NOT NULL DEFAULT false,
  purchased_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(child_id, item_id)
);

ALTER TABLE public.purchased_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchased items" ON public.purchased_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own purchased items" ON public.purchased_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own purchased items" ON public.purchased_items FOR UPDATE USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_child_coins_updated_at BEFORE UPDATE ON public.child_coins FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
