export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-start justify-center p-6 pt-20 text-slate-100">
      <div className="w-full max-w-md bg-slate-800/80 border border-slate-700 rounded-2xl shadow-xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-orange-400 mb-6 text-center">
          your profile
        </h1>

        {/* User Card */}
        <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 mb-2">username</p>
          <p className="text-lg font-semibold mb-4">studyhub_user</p>

          <p className="text-sm text-slate-400 mb-2">email</p>
          <p className="text-lg font-semibold">user@email.com</p>
        </div>

        {/* Mock Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-xs text-slate-400">modules created</p>
            <p className="text-2xl font-bold text-orange-400">7</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-xs text-slate-400">tasks completed</p>
            <p className="text-2xl font-bold text-orange-400">42</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 text-center col-span-2">
            <p className="text-xs text-slate-400">anki decks uploaded</p>
            <p className="text-2xl font-bold text-orange-400">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
