import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
	CheckCircle2,
	KeyRound,
	Lock,
	ShieldCheck,
	UserCircle2,
} from 'lucide-react';
import { FC, FormEventHandler, useEffect, useRef } from 'react';

interface AccountIndexProps extends PageProps {
	status?: string;
}

const FieldGroup: FC<{
	label: string;
	htmlFor: string;
	error?: string;
	children: React.ReactNode;
}> = ({ label, htmlFor, error, children }) => (
	<div>
		<label
			htmlFor={htmlFor}
			className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
		>
			{label}
		</label>
		{children}
		{error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
	</div>
);

const inputClass =
	'w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20';

export default function AccountIndex({ auth, status }: AccountIndexProps) {
	const user = auth.user;

	// ---------- Profile Form ----------
	const {
		data: profileData,
		setData: setProfileData,
		patch: patchProfile,
		errors: profileErrors,
		processing: profileProcessing,
		recentlySuccessful: profileSuccess,
	} = useForm({ name: user.name, email: user.email });

	const handleProfileSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		patchProfile(route('admin.account.profile.update'));
	};

	// ---------- Password Form ----------
	const passwordRef = useRef<HTMLDivElement>(null);
	const {
		data: passData,
		setData: setPassData,
		put: putPassword,
		errors: passErrors,
		processing: passProcessing,
		recentlySuccessful: passSuccess,
		reset: resetPass,
	} = useForm({
		current_password: '',
		password: '',
		password_confirmation: '',
	});

	const handlePasswordSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		putPassword(route('admin.account.password.update'), {
			preserveScroll: true,
			onSuccess: () => resetPass(),
		});
	};

	// Scroll to password section when linked via #password
	useEffect(() => {
		if (window.location.hash === '#password' && passwordRef.current) {
			setTimeout(() => passwordRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
		}
	}, []);

	const roleLabel =
		{ super_admin: 'Super Admin', admin: 'Admin', editor: 'Editor' }[user.role ?? 'editor'] ?? user.role;

	const roleBadgeClass =
		{ super_admin: 'bg-amber-100 text-amber-900 border-amber-300', admin: 'bg-blue-100 text-blue-900 border-blue-300', editor: 'bg-emerald-100 text-emerald-900 border-emerald-300' }[user.role ?? 'editor'] ??
		'bg-slate-100 text-slate-800 border-slate-300';

	return (
		<AdminLayout
			title="Pengaturan Akun"
			headerTitle="Pengaturan Akun"
			headerDescription="Kelola informasi profil dan keamanan akun pengurus Anda."
		>
			<Head title="Pengaturan Akun" />

			<div className="mt-6 max-w-2xl space-y-8">
				{/* Status flash */}
				{status === 'profile-updated' && (
					<div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
						<CheckCircle2 className="h-4 w-4 shrink-0" />
						Informasi profil berhasil diperbarui.
					</div>
				)}
				{status === 'password-updated' && (
					<div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
						<CheckCircle2 className="h-4 w-4 shrink-0" />
						Password berhasil diperbarui.
					</div>
				)}

				{/* ─── Profile Card ─── */}
				<div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
					<div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-6 py-4">
						<UserCircle2 className="h-5 w-5 text-purple-700" />
						<div>
							<h2 className="text-sm font-bold text-slate-900">Informasi Profil</h2>
							<p className="text-xs text-slate-500">Perbarui nama dan alamat email akun Anda.</p>
						</div>
					</div>

					<div className="px-6 py-5">
						{/* Role badge (read-only) */}
						<div className="mb-5 flex items-center gap-2">
							<span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${roleBadgeClass}`}>
								<ShieldCheck className="h-3.5 w-3.5" />
								{roleLabel}
							</span>
							<span className="text-xs text-slate-400">— Role tidak dapat diubah sendiri.</span>
						</div>

						<form onSubmit={handleProfileSubmit} className="space-y-4">
							<FieldGroup label="Nama Lengkap" htmlFor="name" error={profileErrors.name}>
								<input
									id="name"
									type="text"
									required
									value={profileData.name}
									onChange={(e) => setProfileData('name', e.target.value)}
									autoComplete="name"
									className={inputClass}
								/>
							</FieldGroup>

							<FieldGroup label="Alamat Email" htmlFor="email" error={profileErrors.email}>
								<input
									id="email"
									type="email"
									required
									value={profileData.email}
									onChange={(e) => setProfileData('email', e.target.value)}
									autoComplete="username"
									className={inputClass}
								/>
							</FieldGroup>

							<div className="flex items-center gap-3 pt-1">
								<button
									type="submit"
									disabled={profileProcessing}
									className="cursor-pointer rounded-xl bg-purple-900 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-900/20 transition hover:bg-purple-800 disabled:opacity-50"
								>
									{profileProcessing ? 'Menyimpan...' : 'Simpan Perubahan'}
								</button>
								{profileSuccess && (
									<span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
										<CheckCircle2 className="h-3.5 w-3.5" />
										Tersimpan
									</span>
								)}
							</div>
						</form>
					</div>
				</div>

				{/* ─── Password Card ─── */}
				<div id="password" ref={passwordRef} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
					<div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-6 py-4">
						<KeyRound className="h-5 w-5 text-purple-700" />
						<div>
							<h2 className="text-sm font-bold text-slate-900">Ubah Password</h2>
							<p className="text-xs text-slate-500">Gunakan password yang kuat dan unik untuk keamanan akun.</p>
						</div>
					</div>

					<div className="px-6 py-5">
						<form onSubmit={handlePasswordSubmit} className="space-y-4">
							<FieldGroup label="Password Saat Ini" htmlFor="current_password" error={passErrors.current_password}>
								<input
									id="current_password"
									type="password"
									required
									value={passData.current_password}
									onChange={(e) => setPassData('current_password', e.target.value)}
									autoComplete="current-password"
									className={inputClass}
								/>
							</FieldGroup>

							<FieldGroup label="Password Baru" htmlFor="password" error={passErrors.password}>
								<input
									id="password"
									type="password"
									required
									value={passData.password}
									onChange={(e) => setPassData('password', e.target.value)}
									autoComplete="new-password"
									className={inputClass}
								/>
							</FieldGroup>

							<FieldGroup label="Konfirmasi Password Baru" htmlFor="password_confirmation" error={passErrors.password_confirmation}>
								<input
									id="password_confirmation"
									type="password"
									required
									value={passData.password_confirmation}
									onChange={(e) => setPassData('password_confirmation', e.target.value)}
									autoComplete="new-password"
									className={inputClass}
								/>
							</FieldGroup>

							<div className="rounded-xl border border-purple-100 bg-purple-50 px-4 py-3 text-xs text-purple-800 flex items-start gap-2">
								<Lock className="h-3.5 w-3.5 mt-0.5 shrink-0 text-purple-600" />
								<span>Password minimal 8 karakter. Disarankan kombinasi huruf besar, huruf kecil, angka, dan simbol.</span>
							</div>

							<div className="flex items-center gap-3 pt-1">
								<button
									type="submit"
									disabled={passProcessing}
									className="cursor-pointer rounded-xl bg-purple-900 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-900/20 transition hover:bg-purple-800 disabled:opacity-50"
								>
									{passProcessing ? 'Memperbarui...' : 'Perbarui Password'}
								</button>
								{passSuccess && (
									<span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
										<CheckCircle2 className="h-3.5 w-3.5" />
										Password diperbarui
									</span>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
