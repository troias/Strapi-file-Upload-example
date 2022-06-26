import React from "react"
import { useFormik } from "formik"

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async (values) => {
      console.log("values", values)

      const formData = new FormData()

      const data = {
        title: values.title,
      }

      console.log("data", data)

      formData.append("data", JSON.stringify(data))

      //single-file

      formData.append("files.single", values.singleFile)

      //multiple-files
      for (let i = 0; i < values.multiFile.length; i++) {
        formData.append(`files.multi`, values.multiFile[i])
      }

      const updateArticle = await fetch(
        "http://localhost:1337/api/articles/2",
        {
          method: "PUT",
          body: formData,
          headers: {},
        }
      )
      const updateData = await updateArticle.json()
      console.log("updateArticle", updateData)

      //   // simple create new collection with JSON
      //   const createArticle = await fetch("http://localhost:1337/api/articles", {
      //     method: "POST",
      //     body: formData,
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   })
      //   const createRes = await createArticle.json()
      //   console.log(createRes)
    },
  })

  const onMultiFileChange = (e) => {
    const files = e.target.files
    console.log("onMultiFileChange", files)
    formik.setFieldValue("multiFile", files)
  }

  const onSingleFileChange = (e) => {
    const file = e.target.files
    console.log("onSingleFileChange", file)
    console.log("onSingleFileChange1", file[0])

    formik.setFieldValue("singleFile", file[0])
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />

      <label htmlFor="email">single-file-upload</label>
      <input
        id="file"
        name="file"
        type="file"
        onChange={onSingleFileChange}
        value={formik.values.email}
      />

      <label htmlFor="email">multi-file-upload</label>
      <input
        id="file"
        name="multi-file"
        multiple
        type="file"
        onChange={onMultiFileChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export default SignupForm
