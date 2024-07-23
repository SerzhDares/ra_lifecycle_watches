import { useState } from "react";
import uuid from "react-uuid";
import 'moment/dist/locale/ru';
import Watches from "./Watches";

export interface Props {
  id?: string,
  title: string,
  timeZone: string,
  watches?: string
}

export default function Form() {

  const [form, setForm] = useState<Props>({
    title: '',
    timeZone: ''
  })

  const [list, setList] = useState<Props[]>([]);

  const dataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevForm => ({
      ...prevForm, [name]: value
    }))
  }

  const dataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!form.title || !form.timeZone) {
      return;
    }

    const newList = [...list, {
      id: uuid(),
      title: form.title,
      timeZone: form.timeZone,
    }]

    setList(newList);
    setForm({
      title: '',
      timeZone: ''
    })
    console.log(newList);
  }

  const watchesDelete = (item: Props) => {
    setList(list.filter(({id}) => id !== item.id));
  }

  return (
    <div className="container">
      <form className="form" onSubmit={dataSubmit}>
          <div className="inputClass">
              <label className="label" htmlFor="title">Название</label>
              <input className="input" type="text" id="title" name="title" value={form.title} onChange={dataChangeHandler}/>
          </div>
          <div className="inputClass">
              <label className="label" htmlFor="time_zone">Временная зона</label>
              <input className="input tz_input" type="number" min="-11" max="12" id="time_zone" name="timeZone" value={form.timeZone} onChange={dataChangeHandler}/>
          </div>
          <button className="button" type="submit">Добавить</button>
      </form>
      <Watches watches={list} watchesDelete={watchesDelete}/>
    </div>
  )
}
