/**
 * Redirect: /tools/masterclass -> /tools/simulador
 */
import { redirect } from 'next/navigation';

export default function MasterclassRedirect() {
  redirect('/tools/simulador');
}
