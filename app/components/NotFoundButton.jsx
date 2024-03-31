'use client'

import { Button } from '@mui/material';
import Link from 'next/link';

export default function NotFoundButton({ href, title }) {
 return <Button component={Link} scroll={false} href={href} variant='contained' sx={{ mt: 2 }}>{title}</Button>
}