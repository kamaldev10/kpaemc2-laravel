import {
	Bold,
	Code,
	Eye,
	Heading2,
	Heading3,
	Italic,
	Link as LinkIcon,
	List,
	ListOrdered,
	Minus,
	PenTool,
	Quote,
	Strikethrough,
} from 'lucide-react';
import { FC, useRef, useState } from 'react';

interface RichTextEditorProps {
	id?: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	minHeight?: string;
	error?: string;
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
	id,
	value = '',
	onChange,
	placeholder = 'Tuliskan isi artikel Anda di sini...',
	minHeight = '320px',
	error,
}) => {
	const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const insertFormatting = (prefix: string, suffix: string = '') => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = value.substring(start, end) || 'teks';
		const replacement = `${prefix}${selectedText}${suffix}`;

		const newValue =
			value.substring(0, start) + replacement + value.substring(end);
		onChange(newValue);

		// Restore focus and selection
		setTimeout(() => {
			textarea.focus();
			textarea.setSelectionRange(
				start + prefix.length,
				start + prefix.length + selectedText.length
			);
		}, 0);
	};

	const insertLinePrefix = (prefix: string) => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = value.substring(start, end) || 'Teks baris baru';
		const replacement = `\n${prefix}${selectedText}\n`;

		const newValue =
			value.substring(0, start) + replacement + value.substring(end);
		onChange(newValue);

		setTimeout(() => {
			textarea.focus();
		}, 0);
	};

	const handleInsertLink = () => {
		const url = prompt('Masukkan URL tautan:', 'https://');
		if (!url) return;
		insertFormatting('[', `](${url})`);
	};

	const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
	const charCount = value.length;

	// Simple client-side markdown to HTML renderer for live preview tab
	const renderPreviewHtml = (markdown: string) => {
		if (!markdown) {
			return '<p class="text-slate-400 italic">Belum ada konten untuk dipratinjau.</p>';
		}

		let html = markdown
			// Escape raw html tags (except allowed safe tags)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			// Headings
			.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-800 mt-4 mb-2">$1</h3>')
			.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-900 mt-5 mb-3">$1</h2>')
			.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black text-slate-900 mt-6 mb-3">$1</h1>')
			// Blockquotes
			.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-purple-600 pl-4 py-1 italic text-slate-600 my-3 bg-purple-50/50 rounded-r">$1</blockquote>')
			// Bold & Italic & Strike
			.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
			.replace(/\*(.*?)\*/gim, '<em class="italic text-slate-800">$1</em>')
			.replace(/~~(.*?)~~/gim, '<del class="line-through text-slate-500">$1</del>')
			// Inline code
			.replace(/`([^`]+)`/gim, '<code class="bg-slate-100 text-purple-700 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
			// Links
			.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline font-medium hover:text-purple-800">$1</a>')
			// Horizontal rules
			.replace(/^---$/gim, '<hr class="my-6 border-slate-200" />')
			// Lists
			.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 my-1">$1</li>')
			.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 my-1">$1</li>')
			// Paragraphs
			.replace(/\n\n+/g, '</p><p class="mb-3 text-slate-700 leading-relaxed">')
			.replace(/\n/g, '<br />');

		return `<div class="prose prose-slate max-w-none"><p class="mb-3 text-slate-700 leading-relaxed">${html}</p></div>`;
	};

	return (
		<div className={`rounded-xl border bg-white shadow-xs transition-colors ${
			error ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500'
		}`}>
			{/* Editor Header Bar with Toolbar and Mode Switch */}
			<div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-50/90 px-3 py-2">
				{/* Formatting Buttons */}
				<div className="flex flex-wrap items-center gap-1">
					<button
						type="button"
						onClick={() => insertFormatting('**', '**')}
						className="rounded p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
						title="Tebal (Bold)"
					>
						<Bold className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => insertFormatting('*', '*')}
						className="rounded p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
						title="Miring (Italic)"
					>
						<Italic className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => insertFormatting('~~', '~~')}
						className="rounded p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
						title="Coret (Strikethrough)"
					>
						<Strikethrough className="h-4 w-4" />
					</button>

					<span className="mx-1 h-4 w-px bg-slate-300" />

					<button
						type="button"
						onClick={() => insertLinePrefix('## ')}
						className="rounded p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
						title="Judul 2 (H2)"
					>
						<Heading2 className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => insertLinePrefix('### ')}
						className="rounded p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
						title="Judul 3 (H3)"
					>
						<Heading3 className="h-4 w-4" />
					</button>

					<span className="mx-1 h-4 w-px bg-slate-300" />

					<button
						type="button"
						onClick={() => insertLinePrefix('- ')}
						className="rounded p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
						title="Daftar Poin (List)"
					>
						<List className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => insertLinePrefix('1. ')}
						className="rounded p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
						title="Daftar Angka (Ordered List)"
					>
						<ListOrdered className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => insertLinePrefix('> ')}
						className="rounded p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
						title="Kutipan (Blockquote)"
					>
						<Quote className="h-4 w-4" />
					</button>

					<span className="mx-1 h-4 w-px bg-slate-300" />

					<button
						type="button"
						onClick={handleInsertLink}
						className="rounded p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
						title="Sisipkan Tautan (Link)"
					>
						<LinkIcon className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => insertFormatting('`', '`')}
						className="rounded p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
						title="Kode Singkat (Code)"
					>
						<Code className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => insertLinePrefix('\n---\n')}
						className="rounded p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
						title="Garis Pembatas (Divider)"
					>
						<Minus className="h-4 w-4" />
					</button>
				</div>

				{/* Tab Modes: Write vs Preview */}
				<div className="mt-1 flex items-center rounded-lg bg-slate-200/80 p-0.5 sm:mt-0">
					<button
						type="button"
						onClick={() => setActiveTab('write')}
						className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
							activeTab === 'write'
								? 'bg-white text-purple-700 shadow-xs'
								: 'text-slate-600 hover:text-slate-900'
						}`}
					>
						<PenTool className="h-3.5 w-3.5" />
						<span>Tulis</span>
					</button>
					<button
						type="button"
						onClick={() => setActiveTab('preview')}
						className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
							activeTab === 'preview'
								? 'bg-white text-purple-700 shadow-xs'
								: 'text-slate-600 hover:text-slate-900'
						}`}
					>
						<Eye className="h-3.5 w-3.5" />
						<span>Pratinjau</span>
					</button>
				</div>
			</div>

			{/* Main Textarea or Live Preview */}
			{activeTab === 'write' ? (
				<textarea
					ref={textareaRef}
					id={id}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					style={{ minHeight }}
					className="w-full resize-y border-0 bg-transparent p-4 font-mono text-sm leading-relaxed text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-0"
				/>
			) : (
				<div
					style={{ minHeight }}
					className="overflow-y-auto p-4"
					dangerouslySetInnerHTML={{ __html: renderPreviewHtml(value) }}
				/>
			)}

			{/* Editor Footer: Word & Char Counter */}
			<div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-2 text-[11px] text-slate-500">
				<span>Mendukung format Markdown & teks kaya</span>
				<div className="flex items-center gap-3">
					<span>{wordCount} kata</span>
					<span>•</span>
					<span>{charCount} karakter</span>
				</div>
			</div>
		</div>
	);
};

export default RichTextEditor;
