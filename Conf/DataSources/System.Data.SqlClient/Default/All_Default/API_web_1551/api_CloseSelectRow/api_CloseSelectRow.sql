-- DECLARE @ApplicantFromSiteId INT = 22;
-- DECLARE @ApplicantFromSitePhone NVARCHAR(13) = '+380987012275';

SET @ApplicantFromSitePhone = REPLACE(@ApplicantFromSitePhone, '+38', SPACE(0));

---> Получить заявителя в системе по Id с сайта и по номеру телефона (если передан)
DECLARE @ApplicantIn1551 INT = (
  SELECT
    ApplicantId
  FROM
    [CRM_1551_Site_Integration].[dbo].[ApplicantsFromSite]
  WHERE
    Id = @ApplicantFromSiteId
);

DECLARE @ApplicantForPhone TABLE (Id INT);

IF(@ApplicantFromSitePhone IS NOT NULL) 
BEGIN
INSERT INTO
  @ApplicantForPhone(Id)
SELECT
  applicant_id
FROM
  dbo.ApplicantPhones ap
WHERE
  phone_number = @ApplicantFromSitePhone
  AND IsMain = 1;
END
-----> Блок получения контента последнего заполненного документа заявителя
DECLARE @AppealExecutData TABLE (Num INT, appealId INT, considerationId INT, consDate DATETIME, docContent NVARCHAR(MAX));
INSERT INTO @AppealExecutData
SELECT 
DISTINCT 
	ROW_NUMBER() OVER(ORDER BY (SELECT 1)) AS Num,
	[Appeals].Id, 
	[AssignmentConsiderations].Id, 
	[AssignmentConsiderations].consideration_date,
	[AssignmentConsDocuments].content
FROM
  [dbo].[Appeals] [Appeals]
  INNER JOIN [dbo].[Questions] [Questions] ON [Appeals].Id = [Questions].appeal_id
  INNER JOIN [dbo].[Assignments] [Assignments] ON [Questions].last_assignment_for_execution_id = [Assignments].Id
  INNER JOIN [dbo].[AssignmentStates] [AssignmentStates] ON [Assignments].assignment_state_id = [AssignmentStates].Id
  INNER JOIN [dbo].[AssignmentConsiderations] [AssignmentConsiderations] ON [Assignments].Id = [AssignmentConsiderations].assignment_id
  LEFT JOIN [dbo].[AssignmentConsDocuments] [AssignmentConsDocuments] ON [AssignmentConsDocuments].assignment_сons_id = [AssignmentConsiderations].Id
WHERE
  [Appeals].applicant_id = @ApplicantIn1551
  AND [AssignmentStates].code = N'Closed'
  AND [Appeals].receipt_source_id IN (1,2,8)

	UNION 

	SELECT 
	DISTINCT 
	ROW_NUMBER() OVER(ORDER BY (SELECT 1)) AS Num,
	[Appeals].Id, 
	[AssignmentConsiderations].Id, 
	[AssignmentConsiderations].consideration_date,
	[AssignmentConsDocuments].content
FROM
  [dbo].[Appeals] [Appeals]
  INNER JOIN [dbo].[Questions] [Questions] ON [Appeals].Id = [Questions].appeal_id
  INNER JOIN [dbo].[Assignments] [Assignments] ON [Questions].last_assignment_for_execution_id = [Assignments].Id
  INNER JOIN [dbo].[AssignmentStates] [AssignmentStates] ON [Assignments].assignment_state_id = [AssignmentStates].Id
  INNER JOIN [dbo].[AssignmentConsiderations] [AssignmentConsiderations] ON [Assignments].Id = [AssignmentConsiderations].assignment_id
  LEFT JOIN [dbo].[AssignmentConsDocuments] [AssignmentConsDocuments] ON [AssignmentConsDocuments].assignment_сons_id = [AssignmentConsiderations].Id
WHERE
  [Appeals].applicant_id IN (
    SELECT
      Id
    FROM
      @ApplicantForPhone
  )
  AND [AssignmentStates].code = N'Closed'
  AND [Appeals].receipt_source_id IN (1,2,8)
  ;

DECLARE @LastContent TABLE (Id INT, content NVARCHAR(MAX));
DECLARE @Qty SMALLINT = (SELECT COUNT(1) FROM @AppealExecutData);
DECLARE @step SMALLINT = 1;
DECLARE @CurrentAppeal INT;

WHILE (@step <= @Qty)
BEGIN
SET @CurrentAppeal = (SELECT TOP 1 appealId FROM @AppealExecutData WHERE Num = @step);
IF EXISTS (SELECT Id FROM @LastContent WHERE Id = @CurrentAppeal)
BEGIN
	SET @step +=1;
END
ELSE
BEGIN
INSERT INTO @LastContent (Id, content)
VALUES ( 
	@CurrentAppeal,
	(SELECT TOP 1 docContent FROM @AppealExecutData WHERE appealId = @CurrentAppeal AND docContent IS NOT NULL ORDER BY consDate DESC)
	);
SET @step += 1;
END
END

SELECT
DISTINCT 
  [Appeals].Id AS [AppealId],
  [Appeals].[registration_date],
  [Appeals].[registration_number],
  [AssignmentStates].[name] AS AssignmentStates,
  [AssignmentResults].[name] AS Results,
  [Objects].[name] adress,
  [QuestionTypes].[name] AS QuestionTypes,
  [Questions].question_content,
  [Applicants].full_name,
  [Questions].control_date,
  COUNT([MainAssConsDocsFiles].Id) AS CountFiles,
  MainExec.[name] AS Assignment_executor_organization_name,
  [Questions].[object_id],
  [Questions].[geolocation_lat],
  [Questions].[geolocation_lon],
  [MainAss].state_change_date AS Assignment_state_change_date,
	CASE 
		WHEN COUNT([MainAssConsDocsFiles].Id) > 0 
		THEN 1 ELSE 0 
	END AS has_files,
  [MainAssConsRevision].grade,
  [AppealLastContent].content AS main_content,
	[Questions].Id AS Question_id,
	[Questions].[registration_number] AS Question_number,
	[Appeals].[receipt_source_id] AS appeal_receipt_source
FROM
  [dbo].[Appeals] [Appeals]
  INNER JOIN @LastContent [AppealLastContent] ON [AppealLastContent].Id = [Appeals].Id 
  LEFT JOIN [dbo].[Questions] [Questions] ON [Appeals].Id = [Questions].appeal_id
  LEFT JOIN [dbo].[Assignments] [Assignments] ON [Questions].Id = [Assignments].question_id
  LEFT JOIN [dbo].[Objects] [Objects] ON [Questions].[object_id] = [Objects].Id
  LEFT JOIN [dbo].[QuestionTypes] [QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
  LEFT JOIN [dbo].[Applicants] [Applicants] ON [Appeals].applicant_id = [Applicants].Id
  LEFT JOIN [dbo].[Assignments] AS [MainAss] ON [Questions].last_assignment_for_execution_id = [MainAss].Id
  LEFT JOIN [dbo].[AssignmentStates] [AssignmentStates] ON [MainAss].assignment_state_id = [AssignmentStates].Id
  LEFT JOIN [dbo].[AssignmentResults] [AssignmentResults] ON [MainAss].AssignmentResultsId = [AssignmentResults].Id
  LEFT JOIN [dbo].[Organizations] AS [MainExec] ON [MainAss].executor_organization_id = [MainExec].Id
  LEFT JOIN [dbo].[AssignmentConsiderations] [MainAssCons] ON [MainAssCons].assignment_id = [MainAss].Id
  LEFT JOIN [dbo].[AssignmentRevisions] [MainAssConsRevision] ON [MainAssConsRevision].assignment_consideration_іd = [MainAssCons].Id 
  LEFT JOIN [dbo].[AssignmentConsDocuments] [MainAssConsDocs] ON [MainAssConsDocs].assignment_сons_id = [MainAssCons].Id 
  LEFT JOIN [dbo].[AssignmentConsDocFiles] [MainAssConsDocsFiles] ON [MainAssConsDocsFiles].assignment_cons_doc_id = [MainAssConsDocs].Id
  WHERE [AssignmentStates].code = N'Closed'
GROUP BY
  [Appeals].Id,
  [Appeals].registration_date,
  [Appeals].registration_number,
  [AssignmentStates].name,
  [AssignmentResults].name,
  [Objects].name,
  [QuestionTypes].name,
  [Questions].question_content,
  [Applicants].full_name,
  [Questions].control_date,
  [MainExec].name,
  [Questions].[object_id],
  [Questions].[geolocation_lat],
  [Questions].[geolocation_lon],
  [MainAss].state_change_date,
  [MainAssConsRevision].grade,
  [AppealLastContent].content,
  [Questions].Id,
  [Questions].[registration_number],
  [Appeals].[receipt_source_id]
ORDER BY 1 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY 
;