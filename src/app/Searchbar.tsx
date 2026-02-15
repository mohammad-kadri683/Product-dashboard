'use client'

interface SearchbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ searchTerm, setSearchTerm }) => {

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search product.."
        className="form-control searchp w-100"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
