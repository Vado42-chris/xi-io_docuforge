type DfFormSearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

export function DfFormSearchBar({ query, onQueryChange }: DfFormSearchBarProps) {
  return (
    <form className="df-search" role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="form-search">Search blank forms</label>
      <div className="df-search__row">
        <input
          id="form-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by form name, jurisdiction, tag, or purpose"
        />
        <span className="df-search__hint">Static seed data only in this shell slice.</span>
      </div>
    </form>
  );
}
