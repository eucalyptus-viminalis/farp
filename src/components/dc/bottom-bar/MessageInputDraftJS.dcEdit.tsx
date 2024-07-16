'use client'
import Image from 'next/image'
import { Cross1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Editor, EditorState, DraftHandleValue} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Dispatch, SetStateAction, useState} from 'react';

type MessageInputDraftJSProps = {
    editorState: EditorState
    setEditorState: Dispatch<SetStateAction<EditorState>>
    handleReturn: (e: React.KeyboardEvent, editorState: EditorState)=>DraftHandleValue
    handlePastedFiles: (blobs: File[]) => DraftHandleValue
    image?: string
    clearImage: () => void
}

export default function MessageInputDraftJS(props: MessageInputDraftJSProps) {
    const {editorState,setEditorState,clearImage,handleReturn,image,handlePastedFiles} = props

    return (
        // <div className="relative scrollbar-vert mx-1 max-h-[600px] min-h-[40px] w-[332pt] overflow-hidden overflow-y-auto break-words rounded border p-2 px-3 text-sm bg-input text-default border-default">
        <div 
            // className={`
            //     relative 
            //     scrollbar-vert 
            //     mx-1 p-2 px-3 
            //     max-h-[600px] min-h-[40px] w-[332pt] 
            //     overflow-hidden overflow-y-auto break-words 
            //     rounded border 
            //     text-sm text-default 
            //     bg-input 
            //     border-[var(--yellow-9)]
            // `}
            className={`
                relative 
                scrollbar-vert 
                mx-1
                max-h-[600px] min-h-[40px] 
                overflow-hidden overflow-y-auto break-words 
                rounded border 
                p-2 px-3 
                text-lg
                bg-input 
                text-default 
                border-[var(--yellow-9)]
            `}
        >
            {image && (
                // <img 
                //     src={image} 
                //     width={300} 
                //     height={300} 
                //     className='rounded border border-default'
                //     onClick={clearImage}
                // />
                <div 
                    className={`
                        group 
                        rounded-md 
                        relative flex flex-col
                        overflow-hidden 
                    `}
                    // onClick={clearImage}
                >
                    {/* Overlay */}
                    <div className='flex flex-row gap-2'>
                        {/* <div className="
                            w-full h-full
                            bg-red-500
                            absolute top-0 left-0
                            opacity-0
                            sm:group-hover:opacity-70
                            transition-opacity duration-200
                            flex flex-col justify-center items-center
                            sm:hover:cursor-pointer
                            z-10
                        ">
                            <TrashIcon width={64} height={64} color="white"/>
                        </div> */}
                        <img
                            alt="image embed"
                            className={`
                                relative max-h-[500px] w-5/6
                                object-cover object-top
                                rounded border border-default
                            `}
                            src={image}
                        />
                        <Cross1Icon className='cursor-pointer' onClick={clearImage} width={20} height={20} color='var(--yellow-9'/>
                    </div>
                </div>
            )}
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleReturn={handleReturn}
                handlePastedFiles={handlePastedFiles}
                // placeholder="Type your message..."
                spellCheck={true}
            />
        </div>
    );
}
