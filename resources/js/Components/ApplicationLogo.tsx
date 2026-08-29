import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { ImgHTMLAttributes } from 'react';

interface ApplicationLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
	src?: string | null;
}

export default function ApplicationLogo({
	src,
	alt = 'Logo KPA EMC²',
	className = 'h-10 w-auto object-contain',
	...props
}: ApplicationLogoProps) {
	const pageProps = usePage<PageProps>().props;
	const logoSrc = src || pageProps.app_logo_url;

	if (!logoSrc) {
		return <span className="text-lg font-black tracking-tight text-purple-900">KPA EMC²</span>;
	}

	return <img src={logoSrc} alt={alt} className={className} loading="eager" {...props} />;
}
