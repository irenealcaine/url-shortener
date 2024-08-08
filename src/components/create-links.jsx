import React, { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UrlState } from '@/context'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Error from './error'
import { Card } from './ui/card'
import * as yup from 'yup'
import { QRCode } from 'react-qrcode-logo'
import useFetch from '@/hooks/use-fetch'
import { createUrl } from '@/db/apiUrls'

const CreateLink = () => {

  const { user } = UrlState()
  const navigate = useNavigate()
  const ref = useRef()
  let [searchParams, setSearchParams] = useSearchParams()
  const longLink = searchParams.get('createNew')

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  return (

    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button>Create new link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new</DialogTitle>
        </DialogHeader>

        {formValues?.longUrl && (
          <QRCode ref={ref} size={250} value={formValues?.longUrl} />
        )}

        <Input id='title' placeholder='link title' value={formValues.title} onChange={handleChange} />
        {errors.title && <Error message={errors.title} />}

        <Input id='longUrl' placeholder='long url' value={formValues.longUrl} onChange={handleChange} />
        {errors.longUrl && <Error message={errors.longUrl} />}

        <Card>trumss.in</Card>
        <Input id='customUrl' placeholder='custom link optional' value={formValues.customUrl} onChange={handleChange} />

        {error && <Error message={error.message} />}

        <DialogFooter>
          <Button onClick={createNewLink}>{loading ? 'loading...' : 'Save'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>


  )
}

export default CreateLink
