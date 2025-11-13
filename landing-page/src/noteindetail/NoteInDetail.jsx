import React from 'react';

const NoteInDetail = ({
  date,
  siteName,
  noteCount,
  website,
  noteItems
}) => {
  return (
    <div 
      className="bg-white rounded-xl transition-all duration-200 overflow-hidden"
      style={{ 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Card Header with Date and Pin */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_4797_242)">
              <path d="M3.47628 12.0588C3.66616 12.0588 3.82485 11.9936 3.95235 11.8634C4.07985 11.7333 4.1436 11.5786 4.1436 11.3996V8.93375C4.1436 8.75472 4.07985 8.59874 3.95235 8.46582C3.82485 8.3329 3.66616 8.26644 3.47628 8.26644C3.29724 8.26644 3.14533 8.3329 3.02055 8.46582C2.89577 8.59874 2.83337 8.75472 2.83337 8.93375V11.3996C2.83337 11.5786 2.89577 11.7333 3.02055 11.8634C3.14533 11.9936 3.29724 12.0588 3.47628 12.0588ZM6.21879 15.3872C6.40868 15.3872 6.56602 15.3234 6.6908 15.196C6.81558 15.0685 6.87797 14.9125 6.87797 14.728V5.6053C6.87797 5.42084 6.81558 5.26351 6.6908 5.1333C6.56602 5.00309 6.40868 4.93799 6.21879 4.93799C6.03433 4.93799 5.87971 5.00309 5.75492 5.1333C5.63014 5.26351 5.56775 5.42084 5.56775 5.6053V14.728C5.56775 14.9125 5.63014 15.0685 5.75492 15.196C5.87971 15.3234 6.03433 15.3872 6.21879 15.3872ZM8.95317 18.6668C9.14305 18.6668 9.30175 18.6031 9.42924 18.4756C9.55674 18.3481 9.62048 18.1921 9.62048 18.0077V2.32568C9.62048 2.14122 9.55674 1.98524 9.42924 1.85775C9.30175 1.73025 9.14305 1.6665 8.95317 1.6665C8.7687 1.6665 8.61544 1.73025 8.49337 1.85775C8.3713 1.98524 8.31027 2.14122 8.31027 2.32568V18.0077C8.31027 18.1921 8.3713 18.3481 8.49337 18.4756C8.61544 18.6031 8.7687 18.6668 8.95317 18.6668ZM11.6957 14.3943C11.8802 14.3943 12.0361 14.3319 12.1636 14.2072C12.2911 14.0824 12.3549 13.9278 12.3549 13.7433V6.59C12.3549 6.40554 12.2911 6.24957 12.1636 6.12207C12.0361 5.99458 11.8802 5.93083 11.6957 5.93083C11.5112 5.93083 11.3566 5.99458 11.2318 6.12207C11.107 6.24957 11.0446 6.40554 11.0446 6.59V13.7433C11.0446 13.9278 11.107 14.0824 11.2318 14.2072C11.3566 14.3319 11.5112 14.3943 11.6957 14.3943ZM14.4382 16.8602C14.6227 16.8602 14.7773 16.7964 14.902 16.6689C15.0268 16.5414 15.0892 16.3882 15.0892 16.2092V4.12419C15.0892 3.94515 15.0268 3.79053 14.902 3.66032C14.7773 3.53011 14.6227 3.465 14.4382 3.465C14.2483 3.465 14.091 3.53011 13.9662 3.66032C13.8414 3.79053 13.779 3.94515 13.779 4.12419V16.2092C13.779 16.3882 13.8414 16.5414 13.9662 16.6689C14.091 16.7964 14.2483 16.8602 14.4382 16.8602ZM17.1725 12.7586C17.357 12.7586 17.513 12.6949 17.6405 12.5674C17.768 12.4399 17.8317 12.2866 17.8317 12.1076V8.22575C17.8317 8.04671 17.768 7.89209 17.6405 7.76188C17.513 7.63167 17.357 7.56657 17.1725 7.56657C16.9827 7.56657 16.8267 7.63167 16.7046 7.76188C16.5826 7.89209 16.5215 8.04671 16.5215 8.22575V12.1076C16.5215 12.2866 16.5826 12.4399 16.7046 12.5674C16.8267 12.6949 16.9827 12.7586 17.1725 12.7586Z" fill="black"></path>
            </g>
            <defs>
              <clipPath id="clip0_4797_242">
                <rect width="14.9983" height="17.0003" fill="white" transform="translate(2.83337 1.6665)"></rect>
              </clipPath>
            </defs>
          </svg>
          <span className="text-sm" style={{ color: '#64748b' }}>{date || 'August 29, 2025 15:55'}</span>
        </div>
        <button 
          className="p-1 rounded transition-colors hover:bg-gray-100"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(153, 153, 153)' }}>
            <g transform="scale(1.08)">
              <path d="M16.6666 8.30144H11.5475L9.99992 3.3335L8.4523 8.30144H3.33325L7.49992 11.2822L5.89278 16.2502L9.99992 13.1452L14.1071 16.2502L12.4999 11.2822L16.6666 8.30144Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </svg>
        </button>
      </div>

      {/* Card Title Area */}
      <div className="px-4 py-3">
        <h3 className="text-lg font-semibold mb-2" style={{ color: '#1e293b' }}>
          <span>{siteName || 'Tesla Motors'}</span>
          <span className="mx-2">:</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#372804', color: '#FFF097' }}>
            {noteCount || 4}
          </span>
          <span className="ml-2 text-sm font-normal" style={{ color: '#64748b' }}>notes from {website || 'tesla.com'}</span>
        </h3>
      </div>

      {/* Note Items - Full View */}
      <div className="divide-y divide-gray-100">
        {(noteItems || [
          {
            content: "The new Model S Plaid acceleration is incredible - 0-60 in under 2 seconds. This could revolutionize our performance benchmarks.",
            authorInitial: "S",
            author: "Sarah Chen",
            timestamp: "2 hours ago",
            comments: 3,
            likes: 12
          },
          {
            content: "Tesla's FSD Beta v12 neural network architecture is fascinating. The end-to-end approach might be the key to solving autonomous driving.",
            authorInitial: "M",
            author: "Mike Rodriguez",
            timestamp: "4 hours ago",
            comments: 8,
            likes: 24
          },
          {
            content: "Supercharger V4 deployment strategy looks promising. 350kW charging will make long-distance EV travel seamless.",
            authorInitial: "E",
            author: "Emma Watson",
            timestamp: "1 day ago",
            comments: 5,
            likes: 18
          },
          {
            content: "The Cybertruck production timeline update shows they're finally scaling. This could disrupt the entire pickup truck market.",
            authorInitial: "D",
            author: "David Kim",
            timestamp: "2 days ago",
            comments: 12,
            likes: 35
          }
        ]).map((item, index) => (
          <div key={index} className="p-4">
            <p className="text-sm mb-3" style={{ color: '#374151' }}>
              {item.content}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium" style={{ color: '#64748b' }}>{item.authorInitial}</span>
                <span className="text-xs" style={{ color: '#64748b' }}>{item.author}</span>
                <span className="text-xs" style={{ color: '#9ca3af' }}>•</span>
                <span className="text-xs" style={{ color: '#9ca3af' }}>{item.timestamp}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <i className="ri-message-2-line text-xs" style={{ color: '#64748b' }}></i>
                  <span className="text-xs" style={{ color: '#64748b' }}>{item.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="ri-heart-line text-xs" style={{ color: '#64748b' }}></i>
                  <span className="text-xs" style={{ color: '#64748b' }}>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteInDetail;


















