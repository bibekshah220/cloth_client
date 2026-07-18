import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginSchema, type LoginFormData } from '@/validations/auth.validation';
import { useLogin } from '@/hooks/use-auth';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate(from, { replace: true });
      },
    });
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="editorial-heading text-3xl text-stone-900 mb-3">
          Sign In
        </h1>
        <p className="text-stone-500 text-sm">
          Enter your email and password to access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <div className="space-y-1.5">
          <PasswordInput
            label="Password"
            autoComplete="current-password"
            {...register('password')}
            error={errors.password?.message}
          />
          <div className="flex justify-end">
            <Link
              to="/auth/forgot-password"
              className="text-xs text-stone-500 hover:text-stone-900 underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={loginMutation.isPending}
          className="mt-8"
        >
          Sign In
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-stone-500">
          Don't have an account?{' '}
          <Link
            to="/auth/signup"
            className="text-stone-900 font-medium hover:underline underline-offset-4"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
