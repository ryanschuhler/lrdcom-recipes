<#if request.lifecycle == "RENDER_PHASE">
	<div class="faq-section block-container" id="article-${.vars['reserved-article-id'].data}">
		<div class="faq-heading small-padding-horizontal w100">
			<#include "${templatesPath}/898140" />
			<#assign number_of_heading_fields = 2 />
		</div>

		<#list question.siblings as cur_question>
			<div class="question question-${cur_question_index} small-padding-horizontal">
				<svg class="toggle-icon" height='18px' width='18px'><use xlink:href='#toggleCircle' /></svg>

				<h4 class="class-toggle" data-target-nodes="#article-${.vars['reserved-article-id'].data} .question-${cur_question_index}"><strong
					class="live-edit"
					data-article-id='${.vars["reserved-article-id"].data}'
					data-field-name="${cur_question.name}"
					data-level-path="${cur_question_index}"
					data-namespace='${request["portlet-namespace"]}'
					data-resource-url='${request["resource-url"]}'
				>
					${cur_question.data}
				</strong></h4>

				<#list cur_question.answer.siblings as cur_answer>
					<p
						class="live-edit"
						data-article-id='${.vars["reserved-article-id"].data}'
						data-field-name="${cur_question.answer.name}"
						data-level-path="${number_of_heading_fields + cur_question_index},${cur_answer_index}"
						data-namespace='${request["portlet-namespace"]}'
						data-resource-url='${request["resource-url"]}'
					>
						${cur_answer.data}
					</p>
				</#list>
			</div>
		</#list>
	</div>
<#elseif request.lifecycle == "RESOURCE_PHASE">
	<#include "${templatesPath}/885932" />
</#if>