import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import Chart from 'react-google-charts';
import { PanelHeader } from 'common_components';
const pieOptions = {
	title: '',
	pieHole: 0.6,
	slices: [
		{
			color: '#2BB673'
		},
		{
			color: '#d91e48'
		},
		{
			color: '#007fad'
		},
		{
			color: '#e9a227'
		}
	],
	legend: {
		position: 'bottom',
		alignment: 'center',
		textStyle: {
			color: '233238',
			fontSize: 14
		}
	},
	tooltip: {
		showColorCode: true
	},
	chartArea: {
		left: 0,
		top: 0,
		width: '100%',
		height: '80%'
	},
	fontName: 'Roboto'
};
const Overview = () => {
	return (
		<Grid container>
			<Grid item lg={12}>
				<PanelHeader
					title="Statistic Overview"
					subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
				/>

				<Grid container>
					<Grid item lg={12}>
						<Paper className="center h-500" style={{ paddingBottom: 100, marginTop: 36 }}>
							<Chart
								style={{ marginLeft: 100, marginTop: 30, backgroundColor: 'transparent' }}
								width={'80%'}
								height={'100%'}
								chartType="Bar"
								loader={<div>Loading Chart</div>}
								data={[
									[ 'Year', 'Sales', 'Expenses', 'Profit' ],
									[ '2014', 1000, 400, 200 ],
									[ '2015', 1170, 460, 250 ],
									[ '2016', 660, 1120, 300 ],
									[ '2017', 1030, 540, 350 ]
								]}
								options={{
									// Material design options
									chart: {
										title: 'Company Performance',
										subtitle: 'Sales, Expenses, and Profit: 2014-2017'
									}
								}}
								// For tests
								rootProps={{ 'data-testid': '2' }}
							/>
						</Paper>
					</Grid>
				</Grid>

				<Grid container style={{ marginTop: 100 }}>
					<Grid item lg={8} className="center h-500">
						<Chart
							width={'100%'}
							height={'500'}
							chartType="Line"
							loader={<div>Loading Chart</div>}
							data={[
								[ { type: 'date', label: 'Day' }, 'Average temperature', 'Average hours of daylight' ],
								[ new Date(2014, 0), -0.5, 5.7 ],
								[ new Date(2014, 1), 0.4, 8.7 ],
								[ new Date(2014, 2), 0.5, 12 ],
								[ new Date(2014, 3), 2.9, 15.3 ],
								[ new Date(2014, 4), 6.3, 18.6 ],
								[ new Date(2014, 5), 9, 20.9 ],
								[ new Date(2014, 6), 10.6, 19.8 ],
								[ new Date(2014, 7), 10.3, 16.6 ],
								[ new Date(2014, 8), 7.4, 13.3 ],
								[ new Date(2014, 9), 4.4, 9.9 ],
								[ new Date(2014, 10), 1.1, 6.6 ],
								[ new Date(2014, 11), -0.2, 4.5 ]
							]}
							options={{
								chart: {
									title: 'Average Temperatures and Daylight in Iceland Throughout the Year'
								},
								width: 900,
								height: 500,
								series: {
									// Gives each series an axis name that matches the Y-axis below.
									0: { axis: 'Temps' },
									1: { axis: 'Daylight' }
								},
								axes: {
									// Adds labels to each axis; they don't have to match the axis names.
									y: {
										Temps: { label: 'Temps (Celsius)' },
										Daylight: { label: 'Daylight' }
									}
								}
							}}
							rootProps={{ 'data-testid': '4' }}
						/>
					</Grid>
					<Grid item lg={4} className="center h-500">
						<Chart
							chartType="PieChart"
							data={[ [ 'Age', 'Weight' ], [ 'a', 12 ], [ 'b', 5.5 ] ]}
							options={pieOptions}
							graph_id="PieChart"
							width={'100%'}
							height={'400px'}
							legend_toggle
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Overview;
