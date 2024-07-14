'use client'
import { DCEditContext } from '@/contexts/DCEditContext';
import { Editor, EditorState, DraftHandleValue, KeyBindingUtil } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useContext, useState } from 'react';

export default function MessageInputDraftJS() {
    const cx = useContext(DCEditContext)
    const {dispatch,state,} = cx
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    // Handlers
    const handleReturn = (e: React.KeyboardEvent, editorState: EditorState): DraftHandleValue => {
        if (e.shiftKey) {
            return 'not-handled'
        }
        dispatch({
            payload: {
                isSelfDC: true,
                timeDisplay: '4:20 PM',
                txt: editorState.getCurrentContent().getPlainText(),
                reactions: [],
                // replyTo: ,
            },
            type: 'ADD_MESSAGE',
        })
        editorState.getCurrentContent()
        return 'handled'
    }

    return (
        // <div className="relative scrollbar-vert mx-1 max-h-[600px] min-h-[40px] w-[332pt] overflow-hidden overflow-y-auto break-words rounded border p-2 px-3 text-sm bg-input text-default border-default">
        <div 
            className={`
                relative 
                scrollbar-vert 
                mx-1 p-2 px-3 
                max-h-[600px] min-h-[40px] w-[332pt] 
                overflow-hidden overflow-y-auto break-words 
                rounded border 
                text-sm text-default 
                bg-input 
                border-[var(--yellow-9)]
            `}
        >
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleReturn={handleReturn}
                // placeholder="Type your message..."
                spellCheck={true}
            />
        </div>
    );
}
