import React from "react"

export const ErrorMessage: React.FC<{message: string}> = ({message}) => {
    return <div>
        {message}
    </div>
}
