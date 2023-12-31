"use client"

import { FileType } from "@/typings"
import { ColumnDef } from "@tanstack/react-table"
import { FileIcon, defaultStyles } from "react-file-icon"
import prettyBytes from "pretty-bytes"
import { COLOR_EXTENSION_MAP } from "@/constants"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<FileType>[] = [

  {
    accessorKey: "type",
    header: "type",
    cell: ({ renderValue, ...props }) => {
        const type = renderValue() as string;
        const extension: string = type.split("/")[1];
        return (
            <div className="w-10">
                <FileIcon 
                    extension={extension}
                    labelColor={COLOR_EXTENSION_MAP[extension]}
                    // @ts-ignore
                    {... defaultStyles[extension]}
                />
            </div>
        )
    }
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
    // cell: ({ renderValue, ...props }) => {
    //     return (
    //         <div className="flex flex-col">
    //             <div className="text-sm">
    //                 {(renderValue() as Date).toLocaleDateString()}
    //             </div>
    //             <div className="text-xs text-gray-500">
    //                 {(renderValue() as Date).toLocaleTimeString()}
    //             </div>
    //         </div>
    //     )
    // }
  },

  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
        return <span>{prettyBytes(renderValue() as number)}</span>
    }
  },

  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ renderValue, ...props }) => (
        <a 
            href={renderValue() as string}
            target="_blank"
            className="underline text-blue-500 hover:text-blue-600"
        >
            Download
        </a>
    )
  },
  
]
