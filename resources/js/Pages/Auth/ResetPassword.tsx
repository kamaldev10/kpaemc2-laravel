import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, KeyRound, Lock } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ResetPassword({ token, email }: { token: string; email: string }) {
	const { data, setData, post, processing, errors, reset } = useForm({
		token,
		email,
		password: '',
		password_confirmation: '',
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('password.store'), {
			onFinish: () => reset('password', 'password_confirmation'),
		});
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-12">
			<Head title="Reset Password — KPA EMC²" />

			<div className="w-full max-w-md">
				{/* Logo */}
				<div className="mb-8 flex flex-col items-center gap-3">
					<Link href="/" className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-800 bg-purple-900/60 p-2">
							<ApplicationLogo className="h-8 w-8 object-contain" />
						</div>
						<div>
							<p className="text-base font-black tracking-wider text-white">KPA EMC²</p>
							<p className="text-[11px] font-semibold uppercase tracking-widest text-purple-400">Portal Pengurus</p>
						</div>
					</Link>
				</div>

				{/* Card */}
				<div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/50">
					<div className="mb-6 flex flex-col items-center text-center">
						<div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-900/60 text-purple-400">
							<KeyRound className="h-7 w-7" />
						</div>
						<h1 className="text-xl font-extrabold text-white">Buat Password Baru</h1>
						<p className="mt-1.5 text-sm text-slate-400 max-w-xs">
							Masukkan password baru yang kuat untuk akun <span className="text-purple-300 font-semibold">{email}</span>.
						</p>
					</div>

					<form onSubmit={submit} className="space-y-4">
						{/* Email (hidden / read-only display) */}
						<input type="hidden" name="token" value={data.token} />
						<input type="hidden" name="email" value={data.email} />

						<div>
							<label
								htmlFor="password"
								className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5"
							>
								Password Baru
							</label>
							<input
								id="password"
								type="password"
								name="password"
								required
								autoFocus
								value={data.password}
								onChange={(e) => setData('password', e.target.value)}
								autoComplete="new-password"
								placeholder="Masukkan password baru"
								className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/25"
							/>
							{errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
						</div>

						<div>
							<label
								htmlFor="password_confirmation"
								className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5"
							>
								Konfirmasi Password Baru
							</label>
							<input
								id="password_confirmation"
								type="password"
								name="password_confirmation"
								required
								value={data.password_confirmation}
								onChange={(e) => setData('password_confirmation', e.target.value)}
								autoComplete="new-password"
								placeholder="Ulangi password baru"
								className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/25"
							/>
							{errors.password_confirmation && (
								<p className="mt-1.5 text-xs text-red-400">{errors.password_confirmation}</p>
							)}
						</div>

						<div className="flex items-start gap-2 rounded-xl border border-purple-900/50 bg-purple-950/40 px-4 py-3 text-xs text-purple-300">
							<Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
							<span>Password minimal 8 karakter. Gunakan kombinasi huruf besar, kecil, angka, dan simbol.</span>
						</div>

						<button
							type="submit"
							disabled={processing}
							className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-3 text-sm font-bold text-white shadow-md shadow-purple-900/40 transition hover:bg-purple-600 disabled:opacity-50 mt-2"
						>
							<KeyRound className="h-4 w-4" />
							{processing ? 'Memproses...' : 'Reset Password Sekarang'}
						</button>
					</form>
				</div>

				{/* Back */}
				<div className="mt-6 text-center">
					<Link
						href={route('login')}
						className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-purple-300"
					>
						<ArrowLeft className="h-3.5 w-3.5" />
						Kembali ke halaman login
					</Link>
				</div>
			</div>
		</div>
	);
}
