SELECT [Id]
      ,[short_name]
  FROM [dbo].[Organizations]
  where  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only