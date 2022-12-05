import { type ActionFunction, redirect } from '@remix-run/node';
import { db } from '~/utils/db.server';
import SignForm, { userSchema } from './signup';
import bcrypt from 'bcryptjs';
import { commitSession, getSession } from '~/sessions';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);
  const validationResult = userSchema.safeParse(form);
  if (!validationResult.success) return validationResult.error;
  const exists = await db.user.findUnique({
    where: {
      email: form.email as string,
    },
  });
  // search
  if (!exists) return { message: 'El usuario no existe' };
  const isSame = bcrypt.compareSync(form.password, exists.hash);
  if (!isSame) return { message: 'Contraseña incorrecta' };
  // cookie
  const session = await getSession(request.headers.get('Cookie'));
  session.set('userId', exists.id);
  // redirection with commit
  return redirect('/', {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
};

export default function Login() {
  return <SignForm />;
}
