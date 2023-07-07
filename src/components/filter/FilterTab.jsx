import { useContext } from "react";
import { FilterData } from "../../hooks/Filter";
import { LuUtensilsCrossed } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";

// {!--------------!}

const FilterTab = () => {
  const {
    setOpenTab,
    activeFilter,
    sortFilter,
    setActiveFilter,
    setSortFilter,
  } = useContext(FilterData);

  //function to remove the selected filter, no need to pertform the [FilterByRate] function from FilterData context. it automatically will be triggered once the activefilter state changes. at file [Home.jsx]

  const handelRemoveFilter = (type) => {
    let newFilter = activeFilter.filter((item) => item.type !== type);
    setActiveFilter(newFilter);
  };

  // {!--------------!}
  return (
    <>
      <ul className="flex items-center justify-center gap-3 my-4 text-center">
        {/* {this button is used to open the filter modal using openTab state which is comming from filterData context}      */}

        <li>
          <button className="filter-btn" onClick={() => setOpenTab(true)}>
            Filter
            <LuUtensilsCrossed />
          </button>
        </li>

        {/* {rendering all the active filter based on the uer selection }      */}

        {activeFilter &&
          activeFilter.map((item, index) => (
            <li key={index}>
              <button
                className="del-filter-btn"
                onClick={() => handelRemoveFilter(item.type)}
              >
                {item.type}
                <RxCross1 />
              </button>
            </li>
          ))}

        {/* {rendering all the sort filter which, user choose to apply}      */}

        {sortFilter && (
          <li>
            <button
              className="del-filter-btn"
              onClick={() => setSortFilter("")}
            >
              {sortFilter}
              <RxCross1 />
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default FilterTab;
