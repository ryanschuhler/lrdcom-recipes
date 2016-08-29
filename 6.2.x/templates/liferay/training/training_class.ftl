<#assign request_url = "/osb-portlet/training/training_events?" />

<#if course_id.data?has_content>
	<#assign request_url = request_url + "trainingCourseIds=" + course_id.data />
</#if>

<#assign online_course_only = ""/>

<#if course_filter?? && course_filter.data == "true">
	<#assign online_course_only = "&online=true"/>
<#elseif course_filter?? && course_filter.data == "false">
	<#assign online_course_only = "&online=false"/>
</#if>

<#assign request_url = request_url + "&startDate=" + .now?long + online_course_only />
<#assign css_padding_class = "large-padding"/>

<#if number_of_classes.data == "0">
	<#assign css_padding_class = "no-padding"/>
</#if>

<div class="training-class-container ${css_padding_class} w100">
	<#if class_section_heading.data?has_content>
		<h3 class="primary-color">${class_section_heading.data}</h3>
	</#if>

	<div class="block-container justify-space-between no-padding standard-padding-vertical" id="${randomNamespace}trainingEvents"></div>

	<#if number_of_classes.data != "0">
		<#assign css_class = "cta font-color link"/>

		<#if display_style.data == "event_block">
			<#assign css_class = "btn btn-complementary"/>
		</#if>

		<a href="/services/training/schedule" class="${css_class}">
			${languageUtil.get(locale, "see-full-schedule", "See Full Schedule")}

			<#if display_style.data == "event_list">
				<svg class="cta-icon" height="10" width="8"><use xlink:href="#caret" /></svg>
			</#if>
		</a>
	</#if>
</div>

<style>
.training-class-container {
	box-sizing: border-box;
}

.training-class-container td {
	padding: 1em 1em 0 0;
}

.training-class-container .training-class {
	float: left;
	vertical-align: top;
	width: 33%;
}

.training-class-container .training-class .registration {
	padding-top: .5em;
}

.training-class-container .date:before,
.training-class-container .location:before {
	content: " ";
	display: inline-block;
	height: 14px;
	padding-right: 3px;
	width: 14px;
}

.training-class-container .date:before {
	background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMxQzc1QjkiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTIuOSAzLjRoOS44djEwLjdIMi45ek01LjkgMi4xdjUuM005LjcgMi4xdjUuM00xMi43IDYuMUgyLjkiLz48L3N2Zz4K") no-repeat center;
}

.training-class-container .location:before {
	background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMxQzc1QjkiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTExLjQgOC45TDggMTQgNC40IDguNiIvPjxjaXJjbGUgY3g9IjgiIGN5PSI2LjIiIHI9IjQuMiIvPjxjaXJjbGUgY3g9IjgiIGN5PSI2LjIiIHI9IjEuOCIvPjwvZz48L3N2Zz4=") no-repeat center;
}

.training-class .title {
	font-weight: 500;
}
</style>

<script type="text/javascript">
	AUI().ready(
		'aui-base', 'aui-io-request', 'datatype-date',
		function(A) {
			var trainingEventsTable;

			var trainingEvents = A.one('#' + '${randomNamespace}trainingEvents');

			var displayTrainingDate = function(date) {
				var date = A.DataType.Date.parse(date);

				var displayFormat = {
					format: '%B %d, %Y'
				};

				return A.DataType.Date.format(date, displayFormat);
			};

			var displayTrainignEvents = function() {
				var courseCount = ${number_of_classes.data};

				var displayAllClasses = false;

				if (${number_of_classes.data} == 0) {
					displayAllClasses = true;
				}

				if (displayAllClasses || (courseCount > trainingEventsTable.length)) {
					courseCount = trainingEventsTable.length;
				}

				var html = '';

				if ('${display_style.data}' == 'event_list') {
					html = '<table><tr class="header-row">';

					if (displayAllClasses) {
						html += '<th class="text-left">Event</th>';
					}

					html += '<th class="date text-left">Date</th>' +
							'<th class="location text-left">Location</th>';

					if (displayAllClasses) {
						html += '<th class="text-left">Language</th>';
					}

					html += '<th>&nbsp;</th></tr>';

					var buttonText = '${languageUtil.get(locale, "reserve-your-spot", "Reserve Your Spot")}';

					if (courseCount > 5) {
						buttonText = '${languageUtil.get(locale, "register", "Register")}';
					}

					for (i = 0; i < courseCount; i++) {
						html += '<tr class="schedule-detail">';

						if (displayAllClasses) {
							html += '<td>' + trainingEventsTable[i].trainingCourse +'</td>';
						}

						html += '<td>' + displayTrainingDate(trainingEventsTable[i].startDate) +'</td>' +
							'<td>' + trainingEventsTable[i].trainingLocation + '</td>';

						if (displayAllClasses) {
							html += '<td>' + trainingEventsTable[i].language + '</td>';
						}

						var enrollmentURL = trainingEventsTable[i].enrollmentURL;

						if (!enrollmentURL) {
							enrollmentURL = 'https://web.liferay.com/services/training/enroll';
						}

						html += '<td class="registration"><a href="' + enrollmentURL  +
								'" class="btn btn-complementary" target="_blank">' + buttonText + '</a></td></tr>';
					}

					html += ('</table>');
				}
				else {
					for (i = 0; i < courseCount; i++) {
						var enrollmentURL = trainingEventsTable[i].enrollmentURL;

						if (!enrollmentURL) {
							enrollmentURL = 'https://web.liferay.com/services/training/enroll';
						}

						html += '<div class="block small-padding training-class">' +
							'<div class="title">' +
								trainingEventsTable[i].trainingCourse +
							'</div>' +
							'<div class="date">' +
								displayTrainingDate(trainingEventsTable[i].startDate) +
							'</div>' +
							'<div class="location">' +
								trainingEventsTable[i].trainingLocation +
							'</div>' +
							'<div class="registration"><a href="' + enrollmentURL + '" class="cta font-color register" target="_blank">' +
								'${languageUtil.get(locale, "register", "Register")}' +
								'&nbsp;<svg class="cta-icon" height="10" width="8"><use xlink:href="#caret" /></svg></a></div>' +
						'</div>';
					}
				}

				trainingEvents.appendChild(html);
			};

			A.io.request(
				'${request_url}',
				{
					data: {},
					dataType: 'json',
					method: 'GET',
					on: {
						success: function (event, id, obj) {
							var responseData = this.get('responseData');

							trainingEventsTable = responseData.trainingEvents || [];
							displayTrainignEvents();
						},
						failure: function (event, id, obj) {
							console.log('parse error');
						}
					}
				}
			);
		}
	);
</script>