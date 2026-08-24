-- 1) Remap l'item saisonnier sur une valeur de lunettes valide (variant05)
UPDATE public.avatar_items
SET dicebear_value = 'variant05'
WHERE id = '11111111-1111-4111-8111-000000000001';

-- 2) Supprime les anciennes entrées de lunettes invalides (aucune n'est possédée)
DELETE FROM public.avatar_items
WHERE category = 'accessory'
  AND dicebear_value NOT IN ('variant01','variant02','variant03','variant04','variant05');

-- 3) Nettoie une configuration d'avatar pointant sur une valeur invalide
UPDATE public.avatar_config
SET accessories = NULL
WHERE accessories IS NOT NULL
  AND accessories NOT IN ('variant01','variant02','variant03','variant04','variant05');