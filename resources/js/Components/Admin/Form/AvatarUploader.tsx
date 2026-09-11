import { Camera, Image as ImageIcon, Link as LinkIcon, Upload, User, X } from 'lucide-react';
import { FC, useState } from 'react';

interface AvatarUploaderProps {
	id?: string;
	currentAvatarUrl?: string | null;
	onFileSelect: (file: File | null) => void;
	avatarUrlValue: string;
	onAvatarUrlChange: (url: string) => void;
	error?: string;
}

export const AvatarUploader: FC<AvatarUploaderProps> = ({
	id = 'avatar',
	currentAvatarUrl,
	onFileSelect,
	avatarUrlValue,
	onAvatarUrlChange,
	error,
}) => {
	const [mode, setMode] = useState<'upload' | 'url'>('upload');
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFileName(file.name);
			const localUrl = URL.createObjectURL(file);
			setPreviewUrl(localUrl);
			onFileSelect(file);
		}
	};

	const handleClearFile = () => {
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		setPreviewUrl(null);
		setFileName(null);
		onFileSelect(null);
	};

	const displayAvatar = previewUrl || (mode === 'url' ? avatarUrlValue : null) || currentAvatarUrl;

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<label htmlFor={id} className="block text-sm font-semibold text-slate-700">
					Foto Profil / Avatar
				</label>
				<div className="flex items-center gap-1 rounded-lg bg-slate-100 p-0.5 text-xs font-medium text-slate-600">
					<button
						type="button"
						onClick={() => setMode('upload')}
						className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors ${
							mode === 'upload'
								? 'bg-white font-semibold text-purple-700 shadow-xs'
								: 'hover:text-slate-900'
						}`}
					>
						<Upload className="h-3 w-3" />
						<span>Unggah File</span>
					</button>
					<button
						type="button"
						onClick={() => setMode('url')}
						className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors ${
							mode === 'url'
								? 'bg-white font-semibold text-purple-700 shadow-xs'
								: 'hover:text-slate-900'
						}`}
					>
						<LinkIcon className="h-3 w-3" />
						<span>URL Web</span>
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
				{/* Avatar Preview */}
				<div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-100 text-slate-400 shadow-xs">
					{displayAvatar ? (
						<img
							src={displayAvatar}
							alt="Pratinjau Avatar"
							className="h-full w-full object-cover"
							onError={(e) => {
								(e.target as HTMLElement).style.display = 'none';
							}}
						/>
					) : (
						<User className="h-10 w-10 text-slate-300" />
					)}
				</div>

				{/* Input Control */}
				<div className="flex-1 space-y-2">
					{mode === 'upload' ? (
						<div
							className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition-colors ${
								error
									? 'border-rose-300 bg-rose-50/40'
									: 'border-slate-300 bg-slate-50/60 hover:bg-slate-50'
							}`}
						>
							<input
								type="file"
								id={id}
								accept="image/png,image/jpeg,image/webp,image/jpg"
								onChange={handleFileChange}
								className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
							/>
							<div className="flex items-center gap-2 text-xs text-slate-600">
								<Camera className="h-4 w-4 text-purple-600" />
								<span className="font-semibold text-purple-700">Pilih foto</span> atau seret file ke sini
							</div>
							<p className="mt-1 text-[11px] text-slate-400">
								PNG, JPG, WEBP hingga 5MB
							</p>

							{fileName && (
								<div className="mt-2 flex items-center gap-2 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-xs ring-1 ring-slate-200">
									<span className="max-w-[160px] truncate">{fileName}</span>
									<button
										type="button"
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											handleClearFile();
										}}
										className="rounded p-0.5 text-slate-400 hover:text-rose-600"
									>
										<X className="h-3.5 w-3.5" />
									</button>
								</div>
							)}
						</div>
					) : (
						<div>
							<input
								type="url"
								id={`${id}_url`}
								value={avatarUrlValue}
								onChange={(e) => onAvatarUrlChange(e.target.value)}
								placeholder="https://res.cloudinary.com/... atau URL foto"
								className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 placeholder-slate-400 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
							/>
							<p className="mt-1 text-[11px] text-slate-400">
								Masukkan URL langsung gambar
							</p>
						</div>
					)}
				</div>
			</div>

			{error && <p className="text-xs text-rose-600">{error}</p>}
		</div>
	);
};

export default AvatarUploader;
