-- Admin setup SQL for demo users (run after creating auth users)
-- This ensures the profiles table has rows matching auth.users with proper roles.

-- Create profile rows for any of the demo emails that are missing, using ids from auth.users
INSERT INTO public.profiles (id, email, full_name, role)
SELECT u.id, u.email, COALESCE(p.full_name, initcap(split_part(u.email, '@', 1))), 'user1'
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE u.email IN (
  'sadmin@sadmin.com',
  'admin@admin.com',
  'user1@1user.com',
  'user2@2user.com'
)
AND p.id IS NULL;

-- Set specific roles
UPDATE public.profiles SET role = 'superAdmin' WHERE email = 'sadmin@sadmin.com';
UPDATE public.profiles SET role = 'admin'      WHERE email = 'admin@admin.com';
UPDATE public.profiles SET role = 'user1'      WHERE email = 'user1@1user.com';
UPDATE public.profiles SET role = 'user2'      WHERE email = 'user2@2user.com';

-- Verify
SELECT email, role, created_at FROM public.profiles
WHERE email IN (
  'sadmin@sadmin.com',
  'admin@admin.com',
  'user1@1user.com',
  'user2@2user.com'
)
ORDER BY email;
