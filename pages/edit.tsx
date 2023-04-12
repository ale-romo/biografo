import { NextPage } from "next";


const Edit: NextPage = () => {
  return (
    <>
      <div>
        <style>{`iframe{height:90vh;width:100%}`}</style>
        <iframe src='https://biografoimaginario.com:8888/edit_random.html' title='Edicion' ></iframe>
      </div>
    </>
  );
}

export default Edit;
