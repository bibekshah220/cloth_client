import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, type UpdateProfileFormData } from '@/validations/user.validation';
import { useAuthStore } from '@/store/auth.store';
import { userService } from '@/services/user.service';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Gender } from '@/types';

export function ProfilePage() {
  const { user, setUser } = useAuthStore();

  const updateMutation = useMutation({
    mutationFn: (data: UpdateProfileFormData) => userService.update(user!._id, data),
    onSuccess: (res) => {
      if (res.data) setUser(res.data);
      toast.success('Profile updated successfully');
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      phone: user?.phone || '',
      gender: user?.gender || Gender.OTHER,
    },
  });

  const onSubmit = (data: UpdateProfileFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-medium text-stone-900 mb-8">
        Profile Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            {...register('first_name')}
            error={errors.first_name?.message}
          />
          <Input
            label="Last Name"
            {...register('last_name')}
            error={errors.last_name?.message}
          />
        </div>

        <Input
          label="Email Address"
          value={user?.email || ''}
          disabled
          hint="Email address cannot be changed."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone Number"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <div className="space-y-1.5">
            <label className="block text-xs font-medium tracking-wide text-stone-600 uppercase">
              Gender
            </label>
            <select
              {...register('gender')}
              className="w-full h-11 px-3.5 bg-transparent border border-stone-300 rounded-sm text-sm text-stone-900 focus:outline-none focus:border-stone-900"
            >
              <option value={Gender.MALE}>Male</option>
              <option value={Gender.FEMALE}>Female</option>
              <option value={Gender.OTHER}>Other</option>
            </select>
            {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100">
          <Button type="submit" isLoading={updateMutation.isPending}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
