import './Photo.css';

function Photo({title, url}) {
  return (
    <div>
      <img src={url} alt={title} />
    </div>
  );
}

export default Photo;
