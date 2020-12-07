import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper'
import MusicItem from './MusicItem'

const itemsPerPage = 4

export default function MusicDataTable(props) {

    const [page, setPage] = useState(0)
    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage


    return (
        <DataTable>
            <DataTable.Header style={styles.tableHeader}>

                {props.sortColumn == 0 ?
                    (
                        <DataTable.Title sortDirection={props.sortType} style={styles.tableText}
                            onPress={() => { props.handleSorting(props.sortColumn) }}>
                            <Text style={styles.tableTitle}> Song</Text>
                        </DataTable.Title>
                    )
                    :
                    (
                        <DataTable.Title onPress={() => props.handleSorting(0)} style={styles.tableText}>
                            <Text style={styles.tableTitle}> Song</Text>
                        </DataTable.Title>
                    )
                }

                {props.sortColumn == 1 ?
                    (
                        <DataTable.Title sortDirection={props.sortType} onPress={() => props.handleSorting(1)} style={styles.tableText} >
                            <Text style={styles.tableTitle}> Artist</Text>
                        </DataTable.Title>
                    ) :
                    (
                        <DataTable.Title onPress={() => props.handleSorting(1)} style={styles.tableText}>
                            <Text style={styles.tableTitle}> Artist</Text>
                        </DataTable.Title>
                    )
                }
                <DataTable.Title style={styles.tableIcon} numeric>
                    <Text style={styles.tableTitle}> Action</Text>
                </DataTable.Title>


            </DataTable.Header>

            {props.musicas.map((element, idx) =>
                <DataTable.Row>
                    
                        <MusicItem handlePlay={props.handlePlay} music={element}></MusicItem>
                   
                </DataTable.Row>
            )}
            <DataTable.Pagination
                page={page}
                numberOfPages={Math.floor(props.musicas.length) / itemsPerPage}


                onPageChange={page => {
                    setPage(page)
                }}
                label={`${from + 1}-${to} of ${props.musicas.length}`}
            />
        </DataTable>
    )


}

const styles = StyleSheet.create({
    tableHeader: {
        backgroundColor: '#ccc',
    },
    tableTitle: {
        fontWeight: '600',
        fontSize: 20,
        margin: 0,

    }, tableText: {
        flex: 4
    },

    tableIcon: {
        flex: 2
    }

});