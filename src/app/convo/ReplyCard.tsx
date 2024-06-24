'use client'
import { EditContext } from '@/contexts/EditContext';
import React, { useContext } from 'react';

const ReplyCard = () => {
  const cx = useContext(EditContext)
  const replyoor = cx.state.user
  return (
    <div className="flex cursor-pointer flex-row items-center justify-between px-4 py-2 border-t border-faint">
      <div className="flex flex-row items-center space-x-2">
        <button className="relative inline-block h-min shrink-0" title={replyoor.username}>
          <div className="relative mr-2">
            <img
              loading="lazy"
              src={replyoor.pfp}
              className="aspect-square shrink-0 rounded-full border object-cover bg-app border-default"
              alt={replyoor.username + ' avatar'}
              style={{ width: '48px', height: '48px', minWidth: '48px', minHeight: '48px' }}
            />
          </div>
        </button>
        <div className="text-base text-faint">Cast your reply</div>
      </div>
      <button className="rounded-lg font-semibold bg-action text-light px-4 py-2 text-sm hover:bg-current opacity-50">
        Reply
      </button>
    </div>
  );
};

export default ReplyCard;
