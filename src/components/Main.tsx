import React from 'react';
import { Anime, Status } from '../interfaces'

const Main:React.FC = () => {
  const [list, setList] = React.useState<Anime[]>([]);

  const addAnimeToList = (newAnime: Anime) => {
    setList([...list, newAnime]);
  };

  const CardsContainer:React.FC = () => {
    return (
      <div className='cards-container'>
        {list.map((anime: Anime, index: number) => {
          anime.id = index;
          return <Card key={index} {...anime} />
        })}
      </div>
    )
  }

  const Card:React.FC<Anime> = (props: Anime) => {
    function incrementEp(index: number) {
      if (list[index].watched < list[index].total)
        list[index].watched++;

      if (list[index].watched === list[index].total)
        list[index].status = Status.Finished;

      setList([...list]);
    }

    function switchHold(index: number) {
      let st: Status = list[index].status;
  
      if (st === Status.Watching)
        list[index].status = Status.Hold;
      else if (st === Status.Hold)
        list[index].status = Status.Watching;
  
      setList([...list]);
    }

    function removeAnime(index: number) {
      list.splice(index, 1);
      setList([...list]);
    }

    let status: string;
    let statusCl: string;
    switch (props.status) {
      case Status.Watching:
        status = 'Watching';
        statusCl = 'watch';
        break;
      case Status.Hold:
        status = 'On Hold';
        statusCl = 'hold';
        break;
      case Status.Finished:
        status = 'Finished';
        statusCl = 'finished';
        break;
    }
  
    let note: string;
    if (props.notes === "")
      note = "...";
    else 
      note = props.notes as string;
    
    return (
      <div className="card">
        <div className={"card-status " + statusCl}>
          <p className="status-para">{status}</p>
        </div>
        <div className="card-content">
          <p className="card-title">{ props.title }</p>
          <p className="card-ep">{props.watched}/{props.total} Ep</p>
          <p className="card-notes">{note}</p>
        </div>
        <div className="card-buttons">
          <button onClick={() => { incrementEp(props.id) }} className="plus-ep">&#43;Episode</button>
          <button onClick={() => { switchHold(props.id) }} className="switch-hold">Switch Hold</button>
          <button onClick={() => { removeAnime(props.id) }} className="remove-anime">Remove</button>
        </div>
      </div>
    )
  }
  
  const Form:React.FC = () => {
    const [active, setActive] = React.useState<boolean>(false);

    function formSubmit(e: React.FormEvent) {
      e.preventDefault();
      let target = e.target as HTMLFormElement;
      let status: Status = Status.Watching;
  
      let newAnime: Anime = {
        id: list.length,
        title: (target[0] as HTMLInputElement).value,
        status: status, 
        watched: parseInt((target[1] as HTMLInputElement).value), 
        total: parseInt((target[2] as HTMLInputElement).value),
        notes: (target[3] as HTMLInputElement).value
      }
      
      addAnimeToList(newAnime);
      target.reset();
    }

    function openForm() {
      setActive(true);
    }

    function closeForm() {
      setActive(false);
    }

    let cl: string = "";
    if (!active) {
      cl = "inactive";
    }
  
    return (
      <>
        <button onClick={openForm} className="form-open">&#43; Add Title</button>
        <form onSubmit={formSubmit} className={"add-title-form " + cl}>
          <div className="form-heading">
            <p className="form-title">Add Title</p>
            <img onClick={closeForm} className="form-close" src="close.svg" alt="close" />
          </div>
          <input
            type="text"
            name="title-add"
            id="nameFormInput"
            placeholder="Title"
            minLength={2}
            maxLength={100}
            required
          />
          <input
            type="number"
            name="title-add"
            id="epNowFormInput"
            min="0"
            max="3000"
            placeholder="Episodes Watched"
            required
          />
          <input
            type="number"
            name="title-add"
            id="epAllFormInput"
            min="1"
            max="3000"
            placeholder="Episodes Total"
            required
          />
          <input
            type="text"
            name="title-add"
            id="notesFormInput"
            className="input-notes"
            maxLength={89}
            placeholder="Notes"
          />
          <input
            type="submit"
            value="Add Title"
          />
        </form>
        <div onClick={closeForm} className={"overlay " + cl}></div>
      </>
    )
  }

  return (
    <main className="main">
      <CardsContainer />
      <Form />
    </main>
  );
}

export default Main;
