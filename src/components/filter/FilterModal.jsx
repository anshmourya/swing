import { Modal, Slider } from "@mui/material";
import { useContext, useState } from "react";
import { FilterData } from "../../hooks/Filter";
import { LuUtensilsCrossed } from "react-icons/lu";

// !----------!

const FilterModal = () => {
  const { openTab, setOpenTab, setSortFilter, setActiveFilter, activeFilter } =
    useContext(FilterData);

  //mark for the rating silder, to ristrict the value selection (for better understanding refer MUI restrict value selection)
  const ratingMark = [
    {
      value: 1,
      label: "1+",
    },
    {
      value: 2,
      label: "2+",
    },
    {
      value: 3,
      label: "3+",
    },
    {
      value: 4,
      label: "4+",
    },
    {
      value: 5,
      label: "5+",
    },
  ];

  //mark for the rating silder, to ristrict the value selection (for better understanding refer MUI restrict value selection)
  const priceMark = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 100,
      label: "100",
    },
    {
      value: 200,
      label: "200",
    },
    {
      value: 400,
      label: "400",
    },
    {
      value: 600,
      label: "600",
    },
    {
      value: 600,
      label: "600",
    },
    {
      value: 1000,
      label: "1000",
    },
  ];

  const [tab, setTab] = useState("Sort by"); //state to cnahe the tab value to get the active state

  //the get the filter type and value , first it remove the existing filter if available and the nit add the new filter. no need to pertform the [FilterByRate] function from FilterData context. it automatically will be triggered once the activefilter state changes. at file [Home.jsx]

  const filterSetting = (type, value) => {
    let filterBatch = activeFilter.filter((item) => item.type !== type);
    setActiveFilter([...filterBatch, { type, value }]);
  };
  // {!----render the data----!}
  return (
    <>
      <Modal open={openTab}>
        <div className="text-lg modal-size">
          <nav className="flex justify-between p-3 py-5">
            <h1>Filter</h1>
            {/* {opening tab using filter context hook} */}
            <button onClick={() => setOpenTab(false)}>
              <LuUtensilsCrossed />
            </button>
          </nav>
          <section className="flex border h-[17rem] ">
            <aside className="bg-gray-100 ">
              <ul className="flex flex-col gap-10 ">
                {/* rendering the the tab and setting the SetTab based of the selection to render the required filter option */}

                {["Sort by", "Rating", "Cost per person"].map((item, index) => (
                  <li
                    key={index}
                    className={`text-lg font-semibold text-gray-600 cursor-pointer p-3  border-l-[4px] border-transparent ${
                      tab === item ? "filter-tab-active" : ""
                    }`}
                    onClick={() => setTab(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* rendering all the filters option available */}
            </aside>
            <main className="flex-1 p-3">
              {tab === "Sort by" && (
                <RadioFilter setSortFilter={setSortFilter} />
              )}
              {tab === "Rating" && (
                <RateSlider
                  title={tab}
                  max={5}
                  mark={ratingMark}
                  filterSetting={filterSetting}
                />
              )}
              {tab === "Cost per person" && (
                <RateSlider
                  title={tab}
                  max={1000}
                  mark={priceMark}
                  filterSetting={filterSetting}
                />
              )}
            </main>
          </section>
          <footer className="fixed bottom-0 flex justify-end w-full gap-3 p-3 py-5">
            {/* //function to remove all the filters */}

            <button
              onClick={() => {
                setActiveFilter([]);
                setSortFilter("");
                setOpenTab(false);
              }}
              className="-my-2 del-filter-btn"
            >
              clear All
            </button>

            {/*function to remove all the filters */}
          </footer>
        </div>
      </Modal>
    </>
  );
};

export default FilterModal;

//components to render the radion to button to sort the products

function RadioFilter({ setSortFilter }) {
  return [
    "Rating: High to Low",
    "Delivery Time",
    "Cost: Low to High",
    "Cost: High to Low",
  ].map((item, index) => (
    <section className="my-4" key={index}>
      <input
        type="radio"
        name="Sort by"
        id={item.split(" ").join("")}
        className="mr-2 accent-pink-500"
        value={item}
        onClick={() => setSortFilter(item)}
      />
      <label htmlFor={item.split(" ").join("")}>{item}</label>
    </section>
  ));
}

//components to render the silder to selcet the products between the [min and max]

function RateSlider({ title, max, mark, filterSetting }) {
  return (
    <section>
      <h6 className="text-sm text-gray-500">{title}</h6>
      <h3 className="font-semibold">3+</h3>
      <Slider
        track="inverted"
        aria-labelledby="track-inverted-range-slider"
        defaultValue={[0, max]}
        marks={mark}
        max={max}
        size="small"
        valueLabelDisplay="on"
        step={null}
        sx={{
          width: "80%",
          margin: "50px",
          color: "#e23744",
          "& .MuiSlider-thumb": {
            borderRadius: "50%",
            width: "20px",
            height: "20px",
          },
          "& .MuiSlider-valueLabel": {
            background: "#e23744",
          },
          "& .MuiSlider-rail": {
            height: "5px",
          },
        }}
        //calling filtersetting to change the state of the activefilters
        onChangeCommitted={(e, value) => filterSetting(title, value)}
      />
    </section>
  );
}
