import React from 'react';
import {Dimmer, Grid, Loader, Segment} from "semantic-ui-react";

export default function LoadingIndicator() {
    return (
        <div className="loading-indicator"
             style={{display: 'block', textAlign: 'center', marginTop: '30px', minHeight: 1480}}>
            <Dimmer active inverted>
                <Loader size='large'>Загрузка...</Loader>
            </Dimmer>
        </div>
    );
}

export function ShopLoadingIndicator() {
    return (
        <Loader active indeterminate inline size='medium' style={{
            textAlign: 'center',
            width: '100%',
            height: '100%',
            minHeight: 150,
            minWidth: 150,
            marginTop: 125
        }}/>
    );
}

export function CategoryShopLoadingIndicator() {
    return (
        <Loader active indeterminate inline size='medium' style={{
            textAlign: 'center',
            width: '100%',
            height: '100%',
            minHeight: 150,
            minWidth: 150,
            marginTop: 125
        }}/>
    );
}

export function HomeLoadingIndicator() {
    return (
        <Loader active inline='centered' size='mini'/>
    );
}

export function TreesetLoadingIndicator() {
    return (
        <div style={{paddingTop: 103}}>
            <Loader indeterminate active inline='centered'
                    size='medium'/>
        </div>
    );
}

export function ApiUpdatePageLoadingIndicator() {
    return (
        <div className='api-body-main' style={{paddingTop: 103}}>
            <Loader active inline indeterminate size='medium' style={{
                width: '100%',
                height: '100%',
                minHeight: 150,
                minWidth: 150,
                verticalAlign: 'middle'
            }}/>
        </div>

    );
}

export function HomeCellLoadingIndicator() {
    return (
        <>
            <Grid.Column>
                <Segment style={{textAlign: 'center', height: 180}}>
                    <Loader active indeterminate size='medium' style={{textAlign: 'center'}}/>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment style={{textAlign: 'center', height: 180}}>
                    <Loader active indeterminate size='medium' style={{textAlign: 'center'}}/>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment style={{textAlign: 'center', height: 180}}>
                    <Loader active indeterminate size='medium' style={{textAlign: 'center'}}/>
                </Segment>
            </Grid.Column>
        </>
    );
}

/**
 * @return {number}
 */
export function categoryLoadingIndicator(factor, caseX) {
    return factor ? <Loader active inline='centered' size='mini'/> : caseX ? caseX.size : 0
}