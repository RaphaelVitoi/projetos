/**
 * Redirect: /tools/icm -> /tools/simulador
 */
import { redirect } from 'next/navigation';

export default function IcmRedirect() {
  redirect('/tools/simulador');
}
