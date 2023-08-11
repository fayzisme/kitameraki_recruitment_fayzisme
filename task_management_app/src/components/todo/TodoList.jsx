import React, { useEffect, useState } from 'react';
import { mergeStyleSets,  initializeIcons } from '@fluentui/react';
import { DetailsList, DetailsListLayoutMode, Selection, DetailsRow, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';

import api from '../../helper/api'

initializeIcons();

const classNames = mergeStyleSets({
  listContainer: {
    overflow: 'auto',
    maxHeight: '500px',
    maxWidth: '100%',
    border: '1px solid #ccc',
    whiteSpace: 'nowrap'
  },

  listItemCell: {
    height: 'auto', // Atur ketinggian baris menjadi "auto"
    whiteSpace: 'normal', // Izinkan isi teks memanjang
    wordWrap: 'break-word', // Potong kata jika melewati lebar kolom
    fontSize: '1.3em'
  },

  listItemCellDone: {
    height: 'auto', // Atur ketinggian baris menjadi "auto"
    whiteSpace: 'normal', // Izinkan isi teks memanjang
    wordWrap: 'break-word', // Potong kata jika melewati lebar kolom
    fontSize: '1.3em',
    color: 'white',
    selectors: {
        ':hover': {
          color: 'inherit'
        }
    }
  },

  buttonDelete : {
    backgroundColor: 'red',
    border: 'none',
    color: 'white',
    selectors: {
        ':hover': {
          backgroundColor: '#d51010',
          border: 'none'
        }
    }
  },
  buttonDone : {
    backgroundColor: '#08d708',
    border: 'none',
    color: 'white',
    selectors: {
        ':hover': {
          backgroundColor: '#07c407',
          border: 'none'
        }
    }
  },
  buttonDissabled : {
    backgroundColor: 'grey',
    border: 'none',
    color: 'white',
    selectors: {
        ':hover': {
          backgroundColor: 'grey',
          border: 'none'
        }
    }
  }
});

const exampleChildClass = mergeStyles({
    display: 'block',
    marginBottom: '10px',
  });
  
const textFieldStyles = { root: { maxWidth: '300px' } };

const TodoList = ({items,col, onFilterItems, reload, onEdit}) => {
  const [loadedItems, setLoadedItems] = useState(10);
  const [columns1, setColumns] = useState([]);  // Jumlah tugas yang sudah dimuat
  
  useEffect(() => {
    // Efek ini akan dijalankan setiap kali'col' berubah
    setColumns(col.map((el,i) => {
      el.onRender = onRenderItemColumn
      return el
    }))
  
  }, [col]);

  const _onFilter = (ev, text) => {
    onFilterItems(text)
  };

  const _onRenderRow = props => {
    const isSelected = props.item.done;
    return (
      <DetailsRow
        {...props}
        styles={{ root: { backgroundColor: isSelected ? '#08d708' : 'white' } }}
      />
    );
  };


  const onScroll = (event) => {
      const element = event.target;
    if (
        element.scrollHeight - element.scrollTop  < element.clientHeight + 2
    ) {
      // Muat lebih banyak tugas jika mencapai ambang batas scroll
      setLoadedItems((prevLoadedItems) => prevLoadedItems + 5);
    }
  };

  const onRenderItemColumn = (item, index, column) => {
    const fieldContent = item[column.fieldName];

    if (column.key === 'action') {
      return (
        <>
            <div className={!item.done ? "action" : "action-2"}>
                {
                    !item.done &&
                    <PrimaryButton text='Done' iconProps={{ iconName: 'CheckMark' }}
                    title="Done"
                    ariaLabel="Done"
                    className={item.done ?  classNames.buttonDissabled : classNames.buttonDone}
                    onClick={() => handleDoneItem(item)}
                    disabled={item.done} />
                }
                <PrimaryButton text='Edit' iconProps={{ iconName: 'Edit' }}
                title="Edit"
                ariaLabel="Edit"
                onClick={() => handleEditItem(item)} />
                <PrimaryButton text="Delete" iconProps={{ iconName: 'Delete' }}
                title="Delete"
                ariaLabel="Delete"
                className={classNames.buttonDelete}
                onClick={() => handleDeleteItem(item)} />
            </div>
            
        </>
      );
    }else{
        return (
            <div className={item.done ? classNames.listItemCellDone : classNames.listItemCell}>{ (fieldContent ? fieldContent : '-')}</div>
          );
    }


    // return fieldContent;
  };

  async function handleDoneItem(item) {

        item.done = true;

        await api({
            url: `/update/${item.id}`,
            data: item,
            method: "put"
        })
        .then(response => {
            reload();
        })
        .catch(error => {
            console.log(error)
        })
  }

  async function handleEditItem(item) {
    onEdit(item);
  }

  async function handleDeleteItem(item) {

    await api({
        url: `/delete/${item.id}`,
        data: item,
        method: "delete"
    })
    .then(response => {
        reload();
    })
    .catch(error => {
        console.log(error)
    })
}

  

  return (
    <>
        <TextField
            className={exampleChildClass}
            label="Filter by title:"
            onChange={_onFilter}
            styles={textFieldStyles}
        />
        <div className={classNames.listContainer} onScroll={onScroll}>
            {
                items.length > 0 ? 
                <DetailsList
                items={items.slice(0, loadedItems)}
                selectionMode={SelectionMode.none}
                columns={columns1}
                onRenderRow={_onRenderRow}
                /> : 
                <div style={{ textAlign: 'center', padding: '50px' }}>No Data</div>
            }
            
        </div>
    </>
  );
};

export default TodoList;
