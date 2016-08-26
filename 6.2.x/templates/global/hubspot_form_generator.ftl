<#assign portlet_bean_locator = objectUtil("com.liferay.portal.kernel.bean.PortletBeanLocatorUtil") />

<#assign hs_form_local_service = portlet_bean_locator.locate("hubspot-portlet", "com.liferay.hubspot.service.HSFormLocalService") />
<#assign logFactory = objectUtil("com.liferay.portal.kernel.log.LogFactoryUtil") />
<#assign log = logFactory.getLog("com.liferay.portal.kernel.search.SearchEngineUtil") />

<#assign portalURL = "https://" + getterUtil.getString (request['theme-display']['portal-url']) />

<#if (request.lifecycle == 'RENDER_PHASE') && hs_form_local_service??>
	<div class="${article_class.data}">
		<#include "${templatesPath}/1561886" />

		<#include "${templatesPath}/898140" />

		<#--
		Testing Hubspot Account
		<#assign hs_account_id = "299703" />
		<#assign localization_form_id = "72293d1f-6e98-4655-a0f5-e57ac01a7060" />
		-->

		<#--
		Production Hubspot Account
		-->
		<#assign hs_account_id = "252686" />
		<#assign localization_form_id = "6e0954fa-8f47-44a7-996d-e47c6f298f05" />

		<#-- Create a state to country map -->

		<#assign state_country_map = '{"Armed Forces Americas": "United States","Armed Forces Europe": "United States","Alaska": "United States","Alabama": "United States","Armed Forces Pacific": "United States","Arkansas": "United States","American Samoa": "United States","Arizona": "United States","California": "United States","Colorado": "United States","Connecticut": "United States","District of Columbia": "United States","Delaware": "United States","Florida": "United States","Federated Micronesia": "United States","Georgia": "United States","Guam": "United States","Hawaii": "United States","Iowa": "United States","Idaho": "United States","Illinois": "United States","Indiana": "United States","Kansas": "United States","Kentucky": "United States","Louisiana": "United States","Massachusetts": "United States","Maryland": "United States","Maine": "United States","Marshall Islands": "United States","Michigan": "United States","Minnesota": "United States","Missouri": "United States","Northern Mariana Islands": "United States","Mississippi": "United States","Montana": "United States","North Carolina": "United States","North Dakota": "United States","Nebraska": "United States","New Hampshire": "United States","New Jersey": "United States","New Mexico": "United States","Nevada": "United States","New York": "United States","Ohio": "United States","Oklahoma": "United States","Oregon": "United States","Pennsylvania": "United States","Puerto Rico": "United States","Palau": "United States","Rhode Island": "United States","South Carolina": "United States","South Dakota": "United States","Tennessee": "United States","Texas": "United States","United States Minor Outlying Islands": "United States","Utah": "United States","Virginia": "United States","US Virgin Islands": "United States","Vermont": "United States","Washington": "United States","Wisconsin": "United States","West Virginia": "United States","Wyoming": "United States","Australian Capital Territory": "Australia","New South Wales": "Australia","Northern Territory": "Australia","Queensland": "Australia","South Australia": "Australia","Tasmania": "Australia","Victoria": "Australia","Western Australia": "Australia","Acre": "Brazil","Alagoas": "Brazil","Amazonas": "Brazil","Amapá": "Brazil","Bahia": "Brazil","Ceará": "Brazil","Distrito Federal": "Brazil","Espírito Santo": "Brazil","Goiás": "Brazil","Maranhão": "Brazil","Minas Gerais": "Brazil","Mato Grosso do Sul": "Brazil","Mato Grosso": "Brazil","Pará": "Brazil","Paraíba": "Brazil","Pernambuco": "Brazil","Piauí": "Brazil","Paraná": "Brazil","Rio de Janeiro": "Brazil","Rio Grande do Norte": "Brazil","Rondônia": "Brazil","Roraima": "Brazil","Rio Grande do Sul": "Brazil","Santa Catarina": "Brazil","Sergipe": "Brazil","São Paulo": "Brazil","Tocantins": "Brazil","Alberta": "Canada","British Columbia": "Canada","Manitoba": "Canada","New Brunswick": "Canada","Newfoundland and Labrador": "Canada","Nova Scotia": "Canada","Northwest Territories": "Canada","Nunavut": "Canada","Ontario": "Canada","Prince Edward Island": "Canada","Quebec": "Canada","Saskatchewan": "Canada","Yukon Territories": "Canada","Beijing": "China","Tianjin": "China","Hebei": "China","Shanxi": "China","Nei Mongol": "China","Liaoning": "China","Jilin": "China","Heilongjiang": "China","Shanghai": "China","Jiangsu": "China","Zhejiang": "China","Anhui": "China","Fujian": "China","Jiangxi": "China","Shandong": "China","Henan": "China","Hubei": "China","Hunan": "China","Guangdong": "China","Guangxi": "China","Hainan": "China","Chongqing": "China","Sichuan": "China","Guizhou": "China","Yunnan": "China","Xizang": "China","Shaanxi": "China","Gansu": "China","Qinghai": "China","Ningxia": "China","Xinjiang": "China","Chinese Taipei": "China","Hong Kong": "China","Macao": "China","Clare": "Ireland","Cavan": "Ireland","Cork": "Ireland","Carlow": "Ireland","Dublin": "Ireland","Donegal": "Ireland","Galway": "Ireland","Kildare": "Ireland","Kilkenny": "Ireland","Kerry": "Ireland","Longford": "Ireland","Louth": "Ireland","Limerick": "Ireland","Leitrim": "Ireland","Laois": "Ireland","Meath": "Ireland","Monaghan": "Ireland","Mayo": "Ireland","Offaly": "Ireland","Roscommon": "Ireland","Sligo": "Ireland","Tipperary": "Ireland","Waterford": "Ireland","Westmeath": "Ireland","Wicklow": "Ireland","Wexford": "Ireland","Andaman and Nicobar Islands": "India","Andhra Pradesh": "India","Arunachal Pradesh": "India","Assam": "India","Bihar": "India","Chandigarh": "India","Chhattisgarh": "India","Daman and Diu": "India","Delhi": "India","Dadra and Nagar Haveli": "India","Goa": "India","Gujarat": "India","Himachal Pradesh": "India","Haryana": "India","Jharkhand": "India","Jammu and Kashmir": "India","Karnataka": "India","Kerala": "India","Lakshadweep": "India","Maharashtra": "India","Meghalaya": "India","Manipur": "India","Madhya Pradesh": "India","Mizoram": "India","Nagaland": "India","Odisha": "India","Punjab": "India","Puducherry": "India","Rajasthan": "India","Sikkim": "India","Tamil Nadu": "India","Tripura": "India","Uttar Pradesh": "India","Uttarakhand": "India","West Bengal": "India","Agrigento": "Italy","Alessandria": "Italy","Ancona": "Italy","Aosta": "Italy","Ascoli Piceno": "Italy","L&#039;Aquila": "Italy","Arezzo": "Italy","Asti": "Italy","Avellino": "Italy","Bari": "Italy","Bergamo": "Italy","Biella": "Italy","Belluno": "Italy","Benevento": "Italy","Bologna": "Italy","Brindisi": "Italy","Brescia": "Italy","Barletta-Andria-Trani": "Italy","Bolzano": "Italy","Cagliari": "Italy","Campobasso": "Italy","Caserta": "Italy","Chieti": "Italy","Carbonia-Iglesias": "Italy","Caltanissetta": "Italy","Cuneo": "Italy","Como": "Italy","Cremona": "Italy","Cosenza": "Italy","Catania": "Italy","Catanzaro": "Italy","Enna": "Italy","Forlì-Cesena": "Italy","Ferrara": "Italy","Foggia": "Italy","Florence": "Italy","Fermo": "Italy","Frosinone": "Italy","Genoa": "Italy","Gorizia": "Italy","Grosseto": "Italy","Imperia": "Italy","Isernia": "Italy","Crotone": "Italy","Lecco": "Italy","Lecce": "Italy","Livorno": "Italy","Lodi": "Italy","Latina": "Italy","Lucca": "Italy","Monza and Brianza": "Italy","Macerata": "Italy","Messina": "Italy","Milan": "Italy","Mantua": "Italy","Modena": "Italy","Massa and Carrara": "Italy","Matera": "Italy","Naples": "Italy","Novara": "Italy","Nuoro": "Italy","Ogliastra": "Italy","Oristano": "Italy","Olbia-Tempio": "Italy","Palermo": "Italy","Piacenza": "Italy","Padua": "Italy","Pescara": "Italy","Perugia": "Italy","Pisa": "Italy","Pordenone": "Italy","Prato": "Italy","Parma": "Italy","Pistoia": "Italy","Pesaro and Urbino": "Italy","Pavia": "Italy","Potenza": "Italy","Ravenna": "Italy","Reggio Calabria": "Italy","Reggio Emilia": "Italy","Ragusa": "Italy","Rieti": "Italy","Rome": "Italy","Rimini": "Italy","Rovigo": "Italy","Salerno": "Italy","Siena": "Italy","Sondrio": "Italy","La Spezia": "Italy","Syracuse": "Italy","Sassari": "Italy","Savona": "Italy","Taranto": "Italy","Teramo": "Italy","Trento": "Italy","Turin": "Italy","Trapani": "Italy","Terni": "Italy","Trieste": "Italy","Treviso": "Italy","Udine": "Italy","Varese": "Italy","Verbano-Cusio-Ossola": "Italy","Vercelli": "Italy","Venice": "Italy","Vicenza": "Italy","Verona": "Italy","Medio Campidano": "Italy","Viterbo": "Italy","Vibo Valentia": "Italy","Aguascalientes": "Mexico","Baja California": "Mexico","Baja California Sur": "Mexico","Chihuahua": "Mexico","Colima": "Mexico","Campeche": "Mexico","Coahuila": "Mexico","Chiapas": "Mexico","Federal District": "Mexico","Durango": "Mexico","Guerrero": "Mexico","Guanajuato": "Mexico","Hidalgo": "Mexico","Jalisco": "Mexico","Mexico State": "Mexico","Michoacán": "Mexico","Morelos": "Mexico","Nayarit": "Mexico","Nuevo León": "Mexico","Oaxaca": "Mexico","Puebla": "Mexico","Querétaro": "Mexico","Quintana Roo": "Mexico","Sinaloa": "Mexico","San Luis Potosí": "Mexico","Sonora": "Mexico","Tabasco": "Mexico","Tlaxcala": "Mexico","Tamaulipas": "Mexico","Veracruz": "Mexico","Yucatán": "Mexico","Zacatecas": "Mexico"}' />
		<#assign state_country_map = jsonFactoryUtil.createJSONObject(state_country_map) />

		<#-- Generate Hubspot form -->

		<#assign article_namespace = "article${.vars['reserved-article-id'].data}" />

		<#assign portlet_namespace = request["portlet-namespace"]>

		<#if request.attributes.OSB_WWW_HUBSPOT_UTK??>
			<#assign hsutk = request.attributes.OSB_WWW_HUBSPOT_UTK />

			<#assign hs_contact_local_service = portlet_bean_locator.locate("hubspot-portlet", "com.liferay.hubspot.service.HSContactLocalService") />

			<#if hs_contact_local_service.fetchHSContactByUserToken(hsutk)??>
				<#assign hs_contact = hs_contact_local_service.fetchHSContactByUserToken(hsutk) />
				<#assign hs_contact_object = hs_contact.getHSContactJSONObject().getJSONObject("properties") />
			</#if>
		</#if>

		<#assign localization_map = jsonFactoryUtil.createJSONObject() />

		<#if locale != "en_US" && hs_form_local_service.fetchHSFormByGUID(localization_form_id)??>
			<#assign localization_form = hs_form_local_service.fetchHSFormByGUID(localization_form_id) />

			<#assign localization_form_fields = localization_form.getHSFormJSONObject().getJSONArray("fields") />

			<#assign localization_form_start = 0 />
			<#assign localization_form_end = localization_form_fields.length() - 1 />
			<#assign localization_form_range = localization_form_start..localization_form_end />

			<#list localization_form_range as i>
				<#assign localization_form_field = localization_form_fields.getJSONObject(i) />

				<#assign field_map = jsonFactoryUtil.createJSONObject() />

				<#assign VOID = field_map.put("label", localization_form_field.getString("label")) />
				<#assign VOID = field_map.put("options", localization_form_field.getJSONArray("options")) />

				<#assign VOID = localization_map.put(localization_form_field.getString("name"), field_map) />
			</#list>
		</#if>

		<#assign hs_form = hs_form_local_service.fetchHSFormByGUID(form_id.data)! />

		<#assign field_strings_json = jsonFactoryUtil.createJSONObject() />
		<#assign form_rules_json = jsonFactoryUtil.createJSONObject() />
		<#assign asset_info = jsonFactoryUtil.createJSONObject() />

		<#assign asset_id = asset_id.data />

		<#if !asset_id?has_content>
			<#assign query_string = httpUtil.getParameterMap(request.attributes.DYNAMIC_QUERY_STRING) />
			<#assign portlet_id = request.attributes.PORTLET_ID />

			<#assign query_string_asset_id = query_string["_" + portlet_id + "_assetId"]! />

			<#if query_string_asset_id?? && query_string_asset_id[0]?has_content>
				<#assign asset_id = query_string_asset_id[0]/>
			</#if>
		</#if>

		<#if asset_id?has_content>
			<#assign dl_file_entry_local_service_util = staticUtil["com.liferay.portlet.documentlibrary.service.DLFileEntryLocalServiceUtil"]>

			<#if dl_file_entry_local_service_util.fetchDLFileEntry(getterUtil.getLong(asset_id))??>
				<#assign dl_file_entry = dl_file_entry_local_service_util.fetchDLFileEntry(getterUtil.getLong(asset_id)) >

				<#assign void = asset_info.put("asset_folder_id", dl_file_entry.getFolderId()) />
				<#assign void = asset_info.put("asset_id", asset_id) />
				<#assign void = asset_info.put("asset_name", dl_file_entry.getTitle()) />

				<#assign dl_file_entry_type_local_service_util = staticUtil["com.liferay.portlet.documentlibrary.service.DLFileEntryTypeLocalServiceUtil"]>

				<#if dl_file_entry_type_local_service_util.fetchDLFileEntryType(dl_file_entry.getFileEntryTypeId())??>
					<#assign dl_file_entry_type = dl_file_entry_type_local_service_util.fetchDLFileEntryType(dl_file_entry.getFileEntryTypeId()) />

					<#assign void = asset_info.put("asset_type", dl_file_entry_type.getName(locale)) />
				</#if>

				<#assign fieldsMap = dl_file_entry.getFieldsMap(dl_file_entry.getFileVersion().getFileVersionId()) />

				<#list fieldsMap.values() as field>
					<#assign title = dl_file_entry.getTitle() />
					<#assign primary_buyer_stage = field.get("primary_buyer_stage")! />

					<#if primary_buyer_stage?has_content && primary_buyer_stage.getRenderedValue(locale)?has_content>
						<#assign void = asset_info.put("recent_asset_primary_buyer_stage", primary_buyer_stage.getRenderedValue(locale)) />
					</#if>
				</#list>
			</#if>
		</#if>

		<#assign number_of_fields_displayed = getterUtil.getInteger(number_of_fields.data) />

		<#if asset_info.getString("recent_asset_primary_buyer_stage")?has_content>
			<#list number_of_fields.override_number_of_fields.siblings as override>
				<#if override.buyer_stage.data?has_content && (override.buyer_stage.data == asset_info.getString("recent_asset_primary_buyer_stage"))>
					<#assign number_of_fields_displayed = getterUtil.getInteger(override.data) />

					<#break>
				</#if>
			</#list>
		</#if>

		<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
		<#assign http_servlet_request = service_context.getRequest() />

		<#assign vip = paramUtil.getString(http_servlet_request, "vip") />

		<#if vip?has_content>
			<#assign number_of_fields_displayed = vip?length / 2 />
		</#if>

		<#if hs_form?has_content>
			<#assign hs_form_fields = hs_form.getHSFormJSONObject().getJSONArray("fields") />

			<#assign form_css = "lrdcom-form"/>

			<#if text_color?? && text_color.data?has_content>
				<#assign form_css = form_css + " form-${text_color.data}"/>
			</#if>

			<#if number_of_fields_first_column.data?has_content>
				<#assign form_css = form_css + " block-container form-multi-col no-padding"/>
			</#if>

			<div id="${article_namespace}msg"></div>

			<form class="${form_css}" action="https://forms.hubspot.com/uploads/form/v2/${hs_account_id}/${form_id.data}" data-asset-info="${asset_info?html}" data-asset-new-tab="true" id="${article_namespace}fm" method="POST" onsubmit="submitHSForm${article_namespace}('#${article_namespace}fm', this.getAttribute('data-asset-info')); return false;">
				<#assign field_count = 0 />
				<#assign start = 0 />
				<#assign end = hs_form_fields.length() - 1 />
				<#assign range = start..end />

				<div class="form-col form-col-1">
					<#list range as i>
						<#assign item = hs_form_fields.getJSONObject(i) />

						<@print_item item=item />
					</#list>

					<input class="field please-leave-blank" name="please_leave_blank" />

					<#if submit_text.data?has_content>
						<#assign btn_text = submit_text.data />
					<#else>
						<#assign btn_text = hs_form.getSubmitText() />
					</#if>

					<#if !btn_text?has_content>
						<#assign btn_text = "Submit" />
					</#if>

					<#assign btn_text = localize(btn_text?replace(" ", "_")?lower_case, btn_text) />

					<div class="btn-wrapper">
						<input class="btn ${button_color.data}" type="submit" value="${btn_text}" />
					</div>
				</div>
			</form>

			<#assign ip_address = request.attributes.OSB_WWW_REMOTE_ADDRESS! />

			<#assign page_url = "" />

			<#assign page_url = request.attributes.FRIENDLY_URL! />

			<#assign redirect_url = hs_form.getRedirect()! />

			<#if thank_you_text.data?has_content>
				<#assign thank_you_message = localize(thank_you_text.data, "Thank You") />
			<#else>
				<#assign thank_you_message = hs_form.getHSFormJSONObject().getString("inlineMessage")!localize("thank-you", "Thank You") />
			</#if>

			<style type="text/css">
				.please-leave-blank {
					position: absolute;
					left: -999em;
				}
			</style>

			<script type="text/javascript">
				function submitHSForm${article_namespace}(formId, assetInfo) {
					AUI().ready(
						'aui-base',
						'aui-io-request',
						'cookie',
						'json-parse',
						function(A) {
							var form = A.one(formId);
							var msg = A.one('#${article_namespace}msg');

							if (!form) {
								return;
							}

							var fields = {};

							if (assetInfo && (assetInfo != "")) {
								fields = A.JSON.parse(assetInfo);
							}

							var utmCookie = A.Cookie.get("__utmz");

							if (utmCookie) {
								var utmSource = utmCookie.match(new RegExp('utmcsr=(.*?)([|]|$)'));

								if (utmSource && utmSource[1]) {
									var utmSource = utmSource[1];
								}

								var utmCampaign = utmCookie.match(new RegExp('utmccn=(.*?)([|]|$)'));

								if (utmCampaign && utmCampaign[1]) {
									var utmCampaign = utmCampaign[1];
								}

								var utmMedium = utmCookie.match(new RegExp('utmcmd=(.*?)([|]|$)'));

								if (utmMedium && utmMedium[1]) {
									var utmMedium = utmMedium[1];
								}

								var utmTerm = utmCookie.match(new RegExp('utmctr=(.*?)([|]|$)'));

								if (utmTerm && utmTerm[1]) {
									var utmTerm = utmTerm[1];
								}

								var utmContent = utmCookie.match(new RegExp('utmcct=(.*?)([|]|$)'));

								if (utmContent && utmContent[1]) {
									var utmContent = utmContent[1];
								}

								if (utmSource && (utmSource != '(not set)')) {
									fields['recent_conversion_source'] = utmSource;
								}

								if (utmCampaign && (utmCampaign.indexOf('(') == -1) && (utmCampaign.indexOf(')') == -1) && ((utmCampaign.length == 15) || (utmCampaign.length == 18))) {
									fields['campaign'] = utmCampaign;
									fields['sfCampaign'] = utmCampaign;
								}

								if (utmMedium && (utmMedium != '(not set)')) {
									fields['recent_conversion_medium'] = utmMedium;
								}

								if (utmTerm && (utmTerm != '(not set)')) {
									fields['recent_conversion_source_term'] = utmTerm;
								}

								if (utmContent && (utmContent != '(not set)')) {
									fields['recent_conversion_source_content'] = utmContent;
								}
							}

							var previousPageSeen = document.referrer;

							if (previousPageSeen) {
								fields['recent_conversion_previous_page_seen'] = previousPageSeen;
							}

							var leave = false;
							var spam = false;

							form.all('.field').each(
								function(node) {
									var value = node.get('value');

									if (node.hasClass('field-booleancheckbox')) {
										value = node.get('checked');
									}

									if ((node.hasClass('field-required') && value == '') || (node.hasClass('field-required') && !value)) {
										leave = true;

										return;
									}

									var urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?(?!www.liferay|web.liferay|liferay)[A-Za-z0-9\.\-]+|(?:www\.)(?!liferay)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/ig;

									var hasURL = (new RegExp(urlRegEx)).test(value)

									if ((node.hasClass('please-leave-blank') && value.trim() != '') || hasURL) {
										spam = true;
									}

									if (!node.hasClass('hidden-field') && (node.hasClass('field-checkbox') || node.hasClass('field-radio'))) {
										if (node.get('checked') == true) {
											if (fields[node.get('name')]) {
												fields[node.get('name')] += ',' + value;
											}
											else {
												fields[node.get('name')] = value;
											}
										}
									}
									else if ((value != '') || node.hasClass('field-booleancheckbox')) {
										fields[node.get('name')] = value;
									}
								}
							);

							if (leave) {
								msg.setContent('<div class="portlet-msg-error">${localize("please_complete_required_fields", "Please complete all required fields.")}</div>');

								return;
							}

							var guid = '${form_id.data}';

							var ipAddress = '${ip_address}';

							var pageURL = '${page_url}';
							var pageName = document.title;
							var assetURL = '';

							if (fields['asset_id']) {
								assetURL = '${portalURL}/documents/${groupId}/'+ fields['asset_folder_id'] + '/' + fields['asset_name'];
							}

							var redirectURL = '${redirect_url}';
							var salesforceCampaignId = '${hs_form.getLeadNurturingCampaignId()!}';

							if (fields['sfCampaign']) {
								salesforceCampaignId = fields['sfCampaign'];
							}

							var userToken = '${hsutk!}';

							if ((assetURL != '') && (form.getAttribute('data-asset-new-tab') == 'true')) {
								window.open(assetURL, '_blank');
							}

							if (fields['recent_asset_primary_buyer_stage']) {
								var assetPrimaryBuyersStage = fields['recent_asset_primary_buyer_stage'];

								if (assetPrimaryBuyersStage == 'Awareness') {
									var trackEventId = '000000245927';
								}
								else if (assetPrimaryBuyersStage == 'Education') {
									var trackEventId = '000000245928';
								}
								else if (assetPrimaryBuyersStage == 'Evaluation') {
									var trackEventId = '000000245929';
								}
								else if (assetPrimaryBuyersStage == 'Justification') {
									var trackEventId = '000000245931';
								}

								try {
									_hsq.push(
										[
											'trackEvent', {
												id: trackEventId,
												value: null
											}
										]
									);
								}
								catch (error) {
									console.log('_hsq error caught');
								}
							}

							fields['browser_info'] = '${http_servlet_request.getHeader("User-Agent")}';

							var fieldsString = '';

							for(field in fields) {
								fieldsString = fieldsString + field + ':;:' + fields[field] + ':;:';
							}

							var ioRequestUrl = (spam) ? '${request["render-url"]}' : '${request["resource-url"]}';

							A.io.request(
								ioRequestUrl,
								{
									data: {
										${portlet_namespace}fields: fieldsString,
										${portlet_namespace}guid: guid,
										${portlet_namespace}ipAddress: ipAddress,
										${portlet_namespace}pageURL: pageURL,
										${portlet_namespace}pageName: pageName,
										${portlet_namespace}redirectURL: redirectURL,
										${portlet_namespace}salesforceCampaignId: salesforceCampaignId,
										${portlet_namespace}userToken: userToken
									},
									dataType: 'json',
									on: {
										success: function(event, id, obj) {
											<#if on_success_javascript?has_content && (on_success_javascript.data != "")>
												${on_success_javascript.data}
											<#else>
												if (redirectURL != "") {
													window.location.href = redirectURL;
												}
												else {
													msg.setContent('<h3>${thank_you_message}</h3>');

													form.hide();
												}
											</#if>
										},
										failure: function(event, id, obj) {
											msg.setContent('<div class="portlet-msg-error">${localize("your_request_failed_to_complete", "Your Request Failed to Complete")}</div>');
										}
									}
								}
							);
						}
					);
				}

				AUI().ready(
					'aui-base',
					'json-parse',
					'osb-form',
					function(A) {
						new A.OSBForm(
							{
								fieldStrings: ${field_strings_json},
								formId: '#${article_namespace}fm',
								rules: ${form_rules_json}
							}
						).render();

						var form = A.one('#${article_namespace}fm');

						var populateStateField = function(field, value) {
							if (!stateJSON) {
								return;
							}

							field.empty();

							field.setAttribute('value', 'null');

							field.appendChild('<option value="null"></option>');

							var stateOptions = stateJSON[value];

							if (!field || !stateOptions) {
								return;
							}

							var keyArray = stateOptions["key"];

							for (var key in keyArray) {
								var stateValue = keyArray[key];
								var selected = "";

								if (stateValue == stateJSON['selected_option']) {
									selected = "selected";

									field.setAttribute('value', stateValue);
								}

								field.appendChild('<option value="' + stateValue + '"' + selected + '>' + stateOptions[stateValue] + '</option>');
							}
						};

						<#if states_options_json?has_content>
							var stateJSON = A.JSON.parse('${states_options_json}');
						</#if>

						var toggleDependantField = function(node, targetValues, value) {
							if (targetValues.indexOf(value) > -1) {
								if (node.one("#${article_namespace}_state")) {
									populateStateField(node.one('select'), value);
								}

								node.show()
							}
							else {
								if (node.one("#${article_namespace}_state")) {
									stateSelect = node.one('select');

									stateSelect.empty();

									stateSelect.setAttribute('value', 'null');

									stateSelect.appendChild('<option value="null"></option>');
								}

								node.hide()
							}
						};

						var countryFieldSelect = A.one("#${article_namespace}_country select");
						var stateFieldSelect = A.one("#${article_namespace}_state select");

						if(countryFieldSelect && stateFieldSelect) {
							populateStateField(stateFieldSelect, countryFieldSelect.get('value'));
						}

						form.all('.dependant-field').each(
							function(node) {
								var targetFieldName = node.getAttribute('data-target-field');
								var targetField = form.one('#${article_namespace}_' + targetFieldName + ' select');

								if (!targetField) {
									return;
								}

								var targetValues = node.getAttribute('data-target-values');

								toggleDependantField(node, targetValues, targetField.get('value'));

								targetField.on(
									'change',
									function(event) {
										toggleDependantField(node, targetValues, event.currentTarget.get('value'));
									}
								);
							}
						);
					}
				);
			</script>
		</#if>
	</div>

	<#function get_options localization_map field>
		<#if localization_map?has_content>
			<#assign localized_field_name = "" />

			<#assign localized_field_name = field.getString("name") + "_" + stringUtil.lowerCase(locale?string) />

			<#if localization_map.getJSONObject(localized_field_name)??>
				<#return localization_map.getJSONObject(localized_field_name).getJSONArray("options")>
			</#if>
		</#if>

		<#return field.getJSONArray('options')>
	</#function>

	<#macro print_item item>
		<#assign hs_value = "" />
		<#assign required_attr = "" />
		<#assign value = "" />

		<#assign field_type = item.getString("fieldType") />
		<#assign field_name = item.getString("name") />
		<#assign hidden = getterUtil.getBoolean(item.getString("hidden")) />
		<#assign hs_smart_field = getterUtil.getBoolean(item.getString("isSmartField")) />
		<#assign label_text = localize(item.getString("name"), item.getString("label")) />
		<#assign required = getterUtil.getBoolean(item.getString("required")) />

		<#assign value = item.getString("defaultValue")! />

		<#assign selected_options = item.getJSONArray("selectedOptions")! />

		<#if selected_options?has_content>
			<#assign value = selected_options.getString(0)! />
		</#if>

		<#if !hidden && hs_contact_object?? && hs_contact_object.getJSONObject(field_name)??>
			<#assign hs_value = hs_contact_object.getJSONObject(field_name).getString("value") />

			<#assign value = hs_value />
		</#if>

		<#assign field_css_class = "field-wrapper field-${field_type}" />
		<#assign field_input_css_class = "field field-${field_type}" />

		<#if value?has_content>
			<#assign field_css_class = "${field_css_class} field-filled" />
		</#if>

		<#if hidden || (hs_smart_field && (hs_value?has_content))>
			<#assign field_css_class = "${field_css_class} hide" />
			<#assign field_input_css_class = "${field_input_css_class} hidden-field" />
		<#elseif fields_to_skip?has_content && fields_to_skip.contains(field_name)>
			<#-- skip -->
		<#else>
			<#assign field_count = field_count + 1 />
		</#if>

		<#assign field_css_class = "${field_css_class} field-${field_count}" />

		<#if required>
			<#assign field_string = jsonFactoryUtil.createJSONObject() />
			<#assign void = field_string.put("required", localize("x-is-required", "{0} is required", label_text)) />
			<#assign void = field_strings_json.put(field_name, field_string) />

			<#assign form_rule = jsonFactoryUtil.createJSONObject() />
			<#assign void = form_rule.put("required", true) />
			<#assign void = form_rules_json.put(field_name, form_rule) />

			<#assign field_css_class = "${field_css_class} field-required" />
			<#assign field_input_css_class = "${field_input_css_class} field-required" />
			<#assign label_text = "${label_text} *" />
			<#assign required_attr = "required" />
		</#if>

		<#if ((number_of_fields_displayed?? && number_of_fields_displayed != 0) && (field_count > number_of_fields_displayed) && !hidden) || (hs_smart_field && (value?has_content)) || (fields_to_skip?has_content && fields_to_skip.contains(field_name))>
			<#-- skip -->
		<#else>
			<div class="${field_css_class}"  id="${article_namespace}_${field_name}">
				<#if label_text?has_content && (field_type != "richtext") && (field_type != "booleancheckbox")>
					<label class="field-label" for="${field_name}">${label_text}</label>
				</#if>

				<#if hidden>
					<input class="${field_input_css_class}" type="hidden" name="${field_name}" value="${value}"/>
				<#elseif field_type == "select">
					<#assign select_options_map = get_options(localization_map, item) />
					<#assign select_options_start = 0 />
					<#assign select_options_end = select_options_map.length() - 1 />
					<#assign select_options_range = select_options_start..select_options_end />

					<select class="${field_input_css_class}" name="${field_name}" ${required_attr}>
						<option value=""></option>

						<#list select_options_range as i>
							<#assign option = select_options_map.getJSONObject(i) />
							<#assign selected = "" />

							<#if value == option.getString("value") || ((field_name == "country") && country_from_ip?has_content && (option.getString("value") == country_from_ip))>
								<#assign selected = "selected" />
							</#if>

							<option value="${option.getString('value')}" ${selected}>${option.getString("label")}</option>
						</#list>
					</select>

					<#if field_name == "state">
						<#assign states_options_json = jsonFactoryUtil.createJSONObject() />

						<#list select_options_range as i>
							<#assign option = select_options_map.getJSONObject(i) />
							<#assign country_name = "other" />
							<#assign option_value = htmlUtil.escape(option.getString("value")) />
							<#assign country_name = state_country_map.getString(option.getString("value")) />

							<#if !states_options_json.has(country_name)>
								<#assign void = states_options_json.put(country_name, jsonFactoryUtil.createJSONObject()) />
							</#if>

							<#if value == option_value>
								<#assign void = states_options_json.put("selected_option", option_value) />
							</#if>

							<#assign state_option_json = states_options_json.getJSONObject(country_name) />

							<#assign void = state_option_json.put(option_value, htmlUtil.escape(option.getString("label"))) />

							<#if !state_option_json.has("key")>
								<#assign void = state_option_json.put("key", jsonFactoryUtil.createJSONArray()) />
							</#if>

							<#assign void = state_option_json.getJSONArray("key").put(option_value) />
						</#list>

						<#if item.getString("unselectedLabel")?has_content>
							<#assign void = states_options_json.put("unselected_label", label_text) />
						</#if>
					</#if>
				<#elseif field_type == "richtext">
					<span class="hs-richtext">${item.getString('defaultValue')}</span>
				<#elseif field_type == "textarea">
					<textarea class="${field_input_css_class}" name="${field_name}" ${required_attr}>${value}</textarea>
				<#elseif field_type == "booleancheckbox">
					<label class="field-label">
						<input
							class="${field_input_css_class}"
							name="${field_name}"
							type="checkbox"

							<#if value == "true">
								checked
							</#if>
						/>

						${label_text}
					</label>
				<#elseif field_type == "checkbox" || field_type == "radio">
					<#assign checkbox_options_map = get_options(localization_map, item) />
					<#assign checkbox_options_start = 0 />
					<#assign checkbox_options_end = checkbox_options_map.length() - 1 />
					<#assign checkbox_options_range = checkbox_options_start..checkbox_options_end />

					<div class="input">
						<#list checkbox_options_range as i>
							<#assign option = checkbox_options_map.getJSONObject(i) />

							<#if value?has_content && value.indexOf(option.getString("value")) != -1>
								<#assign checked = "checked" />
							<#else>
								<#assign checked = "" />
							</#if>

							<label class="field-label">
								<input class="${field_input_css_class}" ${checked} name="${field_name}" type="${field_type}" value='${option.getString("value")}' />${option.getString("label")}
							</label>
						</#list>
					</div>
				<#else>
					<input
						class="${field_input_css_class}"
						name="${field_name}"

						<#if field_name == "email">
							type="email"
						<#else>
							type="${field_type}"
						</#if>

						${required_attr}

						value="${value}"
					/>
				</#if>

				<#if item.getString("description")?? && item.getString("description")?has_content>
					<div class="field-desc">${localize(item.getString("description"), "")}</div>
				</#if>
			</div>

			<#if number_of_fields_first_column.data?has_content && (field_count == number_of_fields_first_column.data?number) && !hidden>
				</div>
				<div class="form-col form-col-2">
			</#if>
		</#if>

		<#assign dependent_field_filters = item.getJSONArray("dependentFieldFilters") />

		<#if dependent_field_filters.length() gt 0>
			<#assign dependent_field_filters_object = dependent_field_filters.getJSONObject(0) />

			<#assign filters = dependent_field_filters_object.getJSONArray("filters") />
			<#assign form_field_action = dependent_field_filters_object.getString("formFieldAction") />
			<#assign dependent_form_field = dependent_field_filters_object.getJSONObject("dependentFormField") />
			<#assign filter_values = jsonFactoryUtil.createJSONArray(filters.getJSONObject(0).getString("strValues")) />
			<#assign target_values = "" />

			<#assign filter_start = 0 />
			<#assign filter_end = filter_values.length() - 1 />
			<#assign filter_values_range = filter_start..filter_end />

			<#list filter_values_range as i>
				<#assign filter_value = filter_values.getString(i) />

				<#if i != 0 >
					<#assign target_values = target_values + ", " />
				</#if>

				<#assign target_values = target_values + htmlUtil.escape(filter_value) />
			</#list>

			<div class="dependant-field hide" data-target-field="${field_name}" data-target-values="${target_values}">
				<@print_item item=dependent_form_field />
			</div>
		</#if>
	</#macro>
<#elseif request.lifecycle == 'RESOURCE_PHASE'>
	<#assign fields = stringUtil.split(request.parameters.fields, ":;:") />

	<#assign guid = request.parameters.guid />
	<#assign ipAddress = request.parameters.ipAddress />
	<#assign pageURL = request.parameters.pageURL />
	<#assign pageName = request.parameters.pageName />
	<#assign redirectURL = request.parameters.redirectURL />
	<#assign salesforceCampaignId = request.parameters.salesforceCampaignId />
	<#assign userToken = request.parameters.userToken />

	<#assign VOID = hs_form_local_service.submitHSForm(guid, userToken, ipAddress, pageURL, pageName, redirectURL, salesforceCampaignId, fields) />
</#if>