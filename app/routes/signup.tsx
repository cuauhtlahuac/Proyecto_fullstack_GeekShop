import { redirect, type ActionFunction } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { useFormik } from 'formik';
import { z } from 'zod';
import Header from '~/components/Header';
import Input from '~/components/Input';
import Button from '../components/Button';
import { createValidationResult } from '../utils/createValidationResult';
import bcrypt from 'bcryptjs';
import { db } from '~/utils/db.server';
import { commitSession, getSession } from '~/sessions';
import { useEffect } from 'react';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
});
export type UserTpe = z.infer<typeof userSchema>;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);
  const validationResult = userSchema.safeParse(form); // zod
  if (!validationResult.success) return validationResult.error;
  // exists?
  const exists = await db.user.findUnique({
    where: {
      email: form.email as string,
    },
  });
  if (exists) return { message: 'El correo ya está registrado' };
  // hashing
  const hash = bcrypt.hashSync(form.password, bcrypt.genSaltSync(10));
  const user = await db.user.create({
    data: {
      email: form.email as string,
      hash,
    },
  });
  // cookie
  // 1. get the session
  const session = await getSession(request.headers.get('Cookie'));
  // 2. set id
  session.set('userId', user.id);
  // 3. commit cookie => redirection
  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function SignForm() {
  const fetcher = useFetcher();

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    onSubmit: (values) => {
      fetcher.submit(values, { method: 'post' });
    },
    validate: (values) => {
      // return undefined if no errors
      const result = userSchema.safeParse(values);
      if (result.success) return;
      return createValidationResult(result.error);
    },
  });

  useEffect(() => {
    if (fetcher.type === 'done') {
      alert(JSON.stringify(fetcher.data));
    }
  }, [fetcher]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='h-screen gap-4 flex flex-col items-center justify-center'
    >
      <Header />
      <p>
        <label className='block' htmlFor='email'>
          Email
        </label>
        <Input
          id='email'
          placeholder='Escribe tu correo'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p className='text-red-500'>{formik.errors.email}</p>
      </p>
      <p>
        <label className='block' htmlFor='password'>
          Password
        </label>
        <Input
          id='password'
          placeholder='Escribe tu password'
          name='password'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p className='text-red-500'>{formik.errors.password}</p>
      </p>

      <Button
        isLoading={fetcher.state !== 'idle'}
        className='active:opacity-70 w-[380px]'
        variant='outline'
        type='submit'
      >
        Entrar
      </Button>
    </form>
  );
}
