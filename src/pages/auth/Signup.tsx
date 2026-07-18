import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { signupSchema, type SignupFormData } from '@/validations/auth.validation';
import { useSignup } from '@/hooks/use-auth';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';

export function SignupPage() {
  const navigate = useNavigate();
  const signupMutation = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        navigate('/auth/login');
      },
    });
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="editorial-heading text-3xl text-stone-900 mb-3">
          Create Account
        </h1>
        <p className="text-stone-500 text-sm">
          Join Elite Threads to save your wishlist and track your orders.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Full Name"
          type="text"
          autoComplete="name"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label="Email Address"
          type="email"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <PasswordInput
          label="Password"
          autoComplete="new-password"
          hint="Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char"
          {...register('password')}
          error={errors.password?.message}
        />

        <PasswordInput
          label="Confirm Password"
          autoComplete="new-password"
          {...register('confirm_password')}
          error={errors.confirm_password?.message}
        />

        <Button
          type="submit"
          fullWidth
          isLoading={signupMutation.isPending}
          className="mt-8"
        >
          Create Account
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-stone-500">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-stone-900 font-medium hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
