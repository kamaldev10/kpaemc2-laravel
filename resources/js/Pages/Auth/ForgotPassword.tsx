import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Mail, Send } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
	const { data, setData, post, processing, errors } = useForm({ email: '' });

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('password.email'));
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-12">
			<Head title="Lupa Password — KPA EMC²" />

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
							<Mail className="h-7 w-7" />
						</div>
						<h1 className="text-xl font-extrabold text-white">Lupa Password?</h1>
						<p className="mt-1.5 text-sm text-slate-400 max-w-xs">
							Masukkan email akun Anda. Kami akan kirimkan tautan untuk membuat password baru.
						</p>
					</div>

					{/* Status (success message) */}
					{status && (
						<div className="mb-5 flex items-start gap-2.5 rounded-xl border border-emerald-700/50 bg-emerald-900/30 px-4 py-3 text-sm text-emerald-300">
							<CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
							{status}
						</div>
					)}

					<form onSubmit={submit} className="space-y-5">
						<div>
							<label
								htmlFor="email"
								className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5"
							>
								Alamat Email
							</label>
							<input
								id="email"
								type="email"
								name="email"
								required
								autoFocus
								value={data.email}
								onChange={(e) => setData('email', e.target.value)}
								placeholder="nama@email.com"
								autoComplete="username"
								className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/25"
							/>
							{errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
						</div>

						<button
							type="submit"
							disabled={processing}
							className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-3 text-sm font-bold text-white shadow-md shadow-purple-900/40 transition hover:bg-purple-600 disabled:opacity-50"
						>
							<Send className="h-4 w-4" />
							{processing ? 'Mengirim...' : 'Kirim Tautan Reset Password'}
						</button>
					</form>
				</div>

				{/* Back to login */}
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
