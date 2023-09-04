import FilterList from './FilterList';

export default function Filter() {
  return (
    <>
      <form className="hidden lg:block">
        <h3 className="sr-only">Categories</h3>
        <FilterList />
      </form>
    </>
  );
}
