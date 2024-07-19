import {Providers} from './Providers'

import { getServerSession } from 'next-auth'
import './globals.css'
import { Inter } from 'next/font/google'

import Login from './Login';
import Home from './page';
import Navbar from '../components/navbar/Navbar';

const inter = Inter({ subsets: ['latin'] })



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}