# MultiUser SaaS Template

A production-ready, beautifully organized multi-role authentication template built with Next.js 15, Supabase, shadcn/ui, and Framer Motion.

## 🚀 Features

- **Multi-Role Authentication**: 5 different user roles (superAdmin, admin, user1, user2, user3)
- **Role-Based Access Control**: Each role has specific permissions and dashboard access
- **Modern UI/UX**: Built with shadcn/ui components and Framer Motion animations
- **Supabase Integration**: Complete authentication and database setup
- **Responsive Design**: Mobile-first approach with beautiful animations
- **TypeScript**: Full type safety throughout the application
- **Production Ready**: Clean code structure and best practices

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Package Manager**: pnpm
- **UI Components**: shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Fonts**: Inter + Playfair Display

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   └── signup/
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── superadmin/
│   │       ├── admin/
│   │       ├── user1/
│   │       ├── user2/
│   │       └── user3/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   └── auth-form.tsx
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── sidebar.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
└── lib/
    ├── supabase/
    │   ├── client.ts
    │   └── auth-helpers.ts
    └── utils.ts
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd multiusersaas
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Database

Run the following SQL in your Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user1',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'user1')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 👥 User Roles

### Super Admin
- **Access**: Complete system control
- **Features**: User management, system settings, security controls, database access
- **Dashboard**: `/dashboard/superadmin`

### Admin
- **Access**: Administrative privileges
- **Features**: User management, system settings, reports access
- **Dashboard**: `/dashboard/admin`

### User 1
- **Access**: Standard user access
- **Features**: Dashboard access, basic reports, personal settings
- **Dashboard**: `/dashboard/user1`

### User 2
- **Access**: Limited user access
- **Features**: Dashboard access, view reports
- **Dashboard**: `/dashboard/user2`

### User 3
- **Access**: Read-only access
- **Features**: Dashboard access, view data only
- **Dashboard**: `/dashboard/user3`

## 🎨 Customization

### Adding New Roles

1. Update the `UserRole` enum in `src/lib/supabase/auth-helpers.ts`
2. Add role-specific dashboard pages in `src/app/(dashboard)/dashboard/`
3. Update the sidebar navigation in `src/components/layout/sidebar.tsx`
4. Modify the role hierarchy in the `hasRoleAccess` function

### Styling

The project uses Tailwind CSS with shadcn/ui components. You can customize:

- Colors: Modify CSS variables in `src/app/globals.css`
- Components: Edit shadcn/ui components in `src/components/ui/`
- Animations: Adjust Framer Motion animations throughout the app

### Database Schema

The main table is `profiles` which stores user information and roles. You can extend this by:

- Adding new columns to the profiles table
- Creating additional tables for your application data
- Implementing Row Level Security policies for data access

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a service
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

Built with ❤️ using modern web technologies
