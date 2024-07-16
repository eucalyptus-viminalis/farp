'use client'
import { ChangeEvent, FocusEvent, FormEvent, useContext, useState } from "react";
import { MessageEditContext } from "@/contexts/MessageEditContext";
import { CalendarIcon } from "@radix-ui/react-icons";
import { timeAgo } from "@/timeago";

export default function CalendarBtn() {
    const cx = useContext(MessageEditContext)
    const { updateMsg, msgIndex, msg } = cx
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(msg.date ?? msg.timeDisplay)

    const handleClick = () => {
        setShowDatePicker(prev=>!prev);
    };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        // alert('blur')
        // handleDateChange(e.currentTarget.value)
        setShowDatePicker(false); // Close the date picker after selecting a date
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        alert('change')
        handleDateChange(e.currentTarget.value)
        setShowDatePicker(false)
    }
    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        handleDateChange(e.currentTarget.value)
        // setShowDatePicker(false)
    }

    const handleDateChange = (date: string) => {
        // const [year, month, day] = date.split("-").map(Number);
        const formatted = timeAgo.format(new Date(date), 'mini')
        const timeDisplay = formatted.includes('mo') ? formatted.replace('mo', 'mth') : formatted
        updateMsg(
            {
                ...msg,
                date,
                timeDisplay
            },
            msgIndex
        );
    };

    return (
        <div title="change date">
            <CalendarIcon
                onClick={handleClick}
                aria-hidden="true"
                // focusable="false"
                role="img"
                className="cursor-pointer"
                width="20"
                height="20"
                color="var(--yellow-9)"
                style={{
                    display: "inline-block",
                    verticalAlign: "text-bottom",
                    overflow: "visible",
                }}
            />
            {/* {showDatePicker && ( */}
                <input 
                    type="date" 
                    className="absolute"
                    // onChange={handleChange} 
                    onInput={handleInput}
                    // onChange={(e)=>setDate(e.currentTarget.value)} 
                    // onBlur={() => setShowDatePicker(false)} 
                    // onBlur={e=>} 
                    onBlur={handleBlur}
                    hidden={!showDatePicker}
                    autoFocus 
                />
            {/* )} */}
        </div>
    );
}
