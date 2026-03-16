/**
 * Redirect: /tools/toy-games -> /tools/simulador
 */
import { redirect } from 'next/navigation';

export default function ToyGamesRedirect() {
  redirect('/tools/simulador');
}
