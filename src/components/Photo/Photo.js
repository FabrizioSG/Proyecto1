import './Photo.css';

function Photo({title, url}) {
  return (
    <div className='card card-photo-l'>
      <img src={url} alt={title} />
    </div>
  );
}

export default Photo;
