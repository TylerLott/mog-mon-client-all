import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { entitiesActions } from "../../store/entitiesSlice"
import {
  UIContainer,
  UIContainerTitle,
  UIContainerTop,
} from "../../styles/styleGlobalComponents"
import {
  FileForm,
  FileInput,
  FileLabel,
  FileSubmit,
} from "./FileUploadComponents"

const FileUpload = () => {
  const [csvFile, setCsvFile] = useState()
  const dispatch = useDispatch()

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim)
    const rows = str.slice(str.indexOf("\n") + 1).split("\n")
    const newArray = rows.map((row) => {
      const values = row.split(delim)
      const eachObject = headers.reduce((obj, header, i) => {
        let rawHead = header
        if (rawHead) {
          let head = rawHead.trim().replace(/"/g, "")
          let rawVal = values[i]
          if (rawVal) {
            let val = rawVal.trim().replace(/"/g, "")
            obj[head] = val
          }
        }
        return obj
      }, {})
      return eachObject
    })
    const finalArr = newArray.filter((x) => x)
    // submit to socketio
    dispatch(
      entitiesActions.submitFile({
        file: finalArr,
      })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      window.confirm(
        "Are you sure you want to submit? \n\nSubmitting more that once could fuck thing up..."
      )
    ) {
      const file = csvFile
      const reader = new FileReader()

      reader.onload = (e) => {
        const text = e.target.result
        processCSV(text)
      }
      reader.readAsText(file)
    }
    setCsvFile()
  }

  return (
    <UIContainer>
      <UIContainerTop>
        <UIContainerTitle>Winner File Upload</UIContainerTitle>
      </UIContainerTop>
      <FileForm onSubmit={handleSubmit}>
        <FileLabel>
          <FileInput
            type="file"
            accept=".csv"
            id="csvFile"
            track={csvFile}
            onChange={(e) => setCsvFile(e.target.files[0])}
          />
          Add File
        </FileLabel>
        <FileSubmit type="submit" track={csvFile}>
          Submit
        </FileSubmit>
      </FileForm>
    </UIContainer>
  )
}
export default FileUpload
