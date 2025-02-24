import Image from 'next/image';

export default function MemberCard() {
  return (
    <div
      className="stats-card gradient-border card-shine p-6 rounded-2xl animate-in bg-white"
      style={{ animationDelay: '0.3s' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Team Members</h3>
            <div className="text-2xl font-bold text-gray-900">248</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-blue-500 bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium">
            +12
          </span>
          <span className="text-xs text-gray-400 mt-1">this week</span>
        </div>
      </div>
      <div className="neon-line my-4"></div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          <Image
            src="/images/person1.jpg"
            alt="Team member"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg ring-2 ring-white object-cover hover:z-10 transition-all"
          />
          <Image
            src="/images/person1.jpg"
            alt="Team member"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg ring-2 ring-white object-cover hover:z-10 transition-all"
          />
          <Image
            src="/images/person1.jpg"
            alt="Team member"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg ring-2 ring-white object-cover hover:z-10 transition-all"
          />
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-xs text-white font-medium ring-2 ring-white hover:z-10 transition-all">
            +5
          </div>
        </div>
        <button className="text-sm text-brand-500 hover:text-brand-600 font-medium">
          View All
        </button>
      </div>
    </div>
  );
}
