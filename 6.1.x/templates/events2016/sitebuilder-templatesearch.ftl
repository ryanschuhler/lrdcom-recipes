<#if (request.lifecycle == 'RENDER_PHASE')>

<div id=msg> Looking for articles...</div>

<script type="text/javascript">
			AUI().ready(
				'aui-base',
				'aui-io-plugin',
				'aui-io-request',
				'json-parse',
        function(A) {


	var msg = A.one('#msg');
	    A.io.request(
						'${request["resource-url"]}',
						{
							data: {
								groupId: 67510365,
							  structureId: "67612504"
							},
							dataType: 'json',
							on: {
								success: function(event, id, obj) {
                  var data = this.get('responseData');
											msg.setContent('<div class="portlet-msg-success">' +data.articleCount +  ' articles found for that structure</div>');
								},
								failure: function(event, id, obj) {
									msg.setContent('<div class="portlet-msg-error">Your request failed to complete.</div>');
								}
							}
        });

      });
</script>

<#elseif request.lifecycle == 'RESOURCE_PHASE'>

	<#assign groupId = request.parameters.groupId />
	<#assign structureId = request.parameters.structureId />
  <#assign journal_article_service_util = staticUtil["com.liferay.portlet.journal.service.JournalArticleLocalServiceUtil"]>
	<#assign articleCount = journal_article_service_util.getStructureArticlesCount(groupId?number, structureId) />
  {
  "articleCount": ${articleCount}
  }
</#if>