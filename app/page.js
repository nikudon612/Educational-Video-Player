import VideoList from './components/VideoList';
import VideoForm from './components/VideoForm';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Educational Video Platform</h1>
      <VideoForm />
      <VideoList />
    </div>
  );
};

export default Home;
